# Danskdag 1.7.0

FSRS-6 scheduling, 60 new sentence contexts linked to 30 existing words, and ten focused pronunciation guides. Progress IDs, all 158 existing lessons and the full vocabulary remain intact. Device voice selection, post-answer pronunciation comparison and optional local 20-second recording are added without a new voice provider.

Use the same public Site URL. The full distribution includes the self-contained Danskdag.html, source, assets, tests, build tools, Windows launchers and the FSRS MIT notice. No Node.js installation is needed to open the HTML on desktop. Microphone availability for local files depends on the browser; the HTTPS Site is the preferred recording environment.

The app never gives automatic pronunciation or fluency scores. Model target retention is not a learning guarantee. See methods-1.7.0.md for research, exact implementation and verification limits.

Release verification: 185 automated tests passed, 91 JavaScript module syntax checks passed, git diff --check passed, and the Worker build includes 92 assets. Independent code review found no blocking issue. Browser QA covered 360-pixel dark/20-pixel text layouts, two contextual recalls, draft preservation on pause/reload, post-answer comparison, desktop guide/chunk access and unavailable voice/capture fallbacks. Real microphone playback and native speech quality were not exercised on the QA device.
