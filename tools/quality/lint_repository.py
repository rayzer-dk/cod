#!/usr/bin/env python3
"""Validate website generator and static-resource source files in CI."""
import ast
import json
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

root = Path(__file__).resolve().parents[2]
extensions = {'.py', '.js', '.mjs', '.css', '.sql', '.html', '.htm', '.json', '.xml', '.md', '.txt', '.svg'}
count, errors = 0, []
for folder in ('tools', 'content', 'js', 'css', 'sql', 'assets'):
    if not (root / folder).exists():
        continue
    for path in (root / folder).rglob('*'):
        if not path.is_file() or path.suffix.lower() not in extensions or any(x in ('node_modules', '__pycache__') for x in path.parts):
            continue
        try:
            raw = path.read_bytes()
            if raw.startswith(b'\xef\xbb\xbf'):
                raise ValueError('UTF-8 BOM')
            content = raw.decode('utf-8')
            count += 1
            if path.suffix == '.py':
                ast.parse(content, filename=str(path))
            if path.suffix in ('.js', '.mjs'):
                result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
                if result.returncode:
                    raise ValueError(result.stderr.strip())
            if path.suffix == '.json':
                json.loads(content)
            if path.suffix in ('.xml', '.svg'):
                ET.fromstring(content)
        except (SyntaxError, UnicodeError, ValueError, ET.ParseError) as error:
            errors.append(str(path.relative_to(root)) + ': ' + str(error))
for item in errors[:80]:
    print(item, file=sys.stderr)
print('Checked', count, 'source files; errors:', len(errors))
sys.exit(bool(errors))
