# Danskdag independent HTML implementation plan

Goal: make the full existing app directly openable as one HTML file and improve installed browser operation.
Architecture: a small runtime adapter resolves embedded assets and detects the HTML edition; a deterministic builder compiles the acyclic named-import module graph into readable closures and embeds CSS/assets. Hosted app registers a generated static-only service worker. Progress format is unchanged.
Spec: docs/superpowers/specs/2026-10-24-danskdag-offline.md
Constraints: Node.js 20+ only for building/developer tooling; no runtime install for the HTML edition, no new dependencies, no API keys or new speech provider, preserve Site audience and all progress IDs.

Task 1: Write failing bundler/asset tests, implement tools/build-offline.mjs and dist/runtime.mjs; adapt logo/flag/illustration URLs. Require complete module export/import validation, no runtime imports, all bundled pictures and no external stylesheet/script references.
Task 2: Add tests for local settings and absence of cloud creation/polling in offline mode. Adapt app/views/continuity copy and actions. Build static-only service worker; test private API pass-through, cache-first allowed assets and versioned cache cleanup scope.
Task 3: Add HTML launch and optional Windows icon shortcut, include ICO, version/docs/audit. Check browser interactions of the generated HTML and hosted mode at 360px, TTS fallback, save/reload and lesson exercise. Run full checks, build, publish, package and test full archive and standalone HTML.

Review focus: file URL storage differs by browser; HTML must escape script terminators; uncached APIs must not be replayed; image paths must be data URLs in embedded mode; unsupported future ESM changes must fail the build.
Execution: inline, followed by independent focused review and the Site source helper for commit/push/package.
