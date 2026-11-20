#!/usr/bin/env python3
"""Conservative first-party cross-reference and workaround inventory.

The output contains *candidates*, not safe-to-delete declarations:
dynamic classes, OCMOD, Events, template overrides and external entrypoints
need manual investigation.
"""
import argparse
import collections
import json
from pathlib import Path
import re

IGNORED = {"vendor", "node_modules", "storage", "cache", "__pycache__", "dist", "build"}
EXTS = {".php", ".py", ".js", ".mjs", ".css", ".twig", ".html", ".htm", ".xml"}
WORKAROUND = re.compile(r"(?im)^\s*(?://|/\*|\*|#)\s*.*\b(?:workaround|temporary fix|hotfix|quick fix|compatibility hack)\b")
CSS_CLASS = re.compile(r"(?<![\w-])\.([a-zA-Z_][\w-]{3,})")
JS_FUNCTION = re.compile(r"\b(?:async\s+)?function\s+([a-zA-Z_$][\w$]*)\s*\(")
CSS_RULE = re.compile(r"(?:^|\})\s*([^{}]+)\s*\{", re.M)
WORD = re.compile(r"[a-zA-Z_$][\w$-]*")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", type=Path, default=Path("."))
    ap.add_argument("--out", type=Path, default=Path("build/quality/cross-references.json"))
    ap.add_argument("--directories", nargs="+", required=True)
    args = ap.parse_args()
    root = args.root.resolve()
    sources = {}
    for directory in args.directories:
        base = root / directory
        if not base.is_dir():
            continue
        for path in sorted(base.rglob("*")):
            if not path.is_file() or path.suffix.lower() not in EXTS:
                continue
            if any(part in IGNORED for part in path.relative_to(root).parts):
                continue
            if path.name.endswith((".min.js", ".min.css")):
                continue
            try:
                sources[path.relative_to(root).as_posix()] = path.read_text("utf-8")
            except (UnicodeError, OSError):
                continue
    consumers = "\n".join(v for k, v in sources.items() if not k.endswith(".css"))
    counts = collections.Counter(WORD.findall(consumers))
    findings = []
    for path, content in sources.items():
        if path.endswith(".css"):
            for name in sorted(set(CSS_CLASS.findall(" ".join(CSS_RULE.findall(content))))):
                if counts[name] == 0:
                    findings.append({"type":"css-reference-candidate","path":path,"name":name})
        if path.endswith((".js", ".mjs")):
            for name in sorted(set(JS_FUNCTION.findall(content))):
                if counts[name] == 1:
                    findings.append({"type":"js-single-reference-candidate","path":path,"name":name})
        for hit in WORKAROUND.finditer(content):
            findings.append({"type":"workaround-comment-review","path":path,
                            "line":content.count("\n", 0, hit.start()) + 1})
    summary = dict(sorted(collections.Counter(f["type"] for f in findings).items()))
    report = {"scanned_files":len(sources), "summary":summary, "candidate_count":len(findings),
              "candidates":findings, "note":"Advisory only. No automatic removal."}
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", "utf-8")
    print(json.dumps({"scanned_files":len(sources),"summary":summary}, ensure_ascii=False))

if __name__ == "__main__":
    main()
