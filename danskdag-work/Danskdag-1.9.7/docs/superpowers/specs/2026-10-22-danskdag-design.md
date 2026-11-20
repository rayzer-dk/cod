# Danskdag: Russian–Danish practice

User intent: an application inspired by short game-like language lessons, for Russian-speaking learners of Danish, working on phone and desktop. The user chose a single web application. This first release assumes individual use and offers foundations plus harder practice relevant to a DU3 learner; it is not a complete or officially aligned DU3 curriculum.

The application contains a lesson map, a six-exercise lesson player, a phrase dictionary, spaced review, grammar notes, progress statistics and settings. Twelve original lessons span A1, A2 and B1 practice. All lessons are available without artificial locks. Exercises include meaning selection, Danish word ordering, typed translation and optional listening. Explanations are Russian, study text is Danish. Correct Danish letters remain significant. Case, punctuation and repeated whitespace are normalized. Explicit alternative translations are accepted.

A light warm Scandinavian interface uses coral, cream, dark ink and teal. A compact sidebar becomes a mobile bottom navigation. All actions use accessible labels and visible focus. The product has its own name and assets.

Architecture: buildless HTML, CSS and JavaScript ES modules. Content is structured separately from the learning engine and view. Versioned localStorage holds validated progress, phrase review schedules, preferences and an optional in-progress session. Progress is local to this browser; explicit JSON export/import supports moving it. Import must validate data and never overwrite on an invalid file. Rendering escapes all input. Storage errors are visible and do not crash lessons.

Danish speech uses only an available da-DK browser voice, responds to asynchronously loaded voices and explains when no voice is installed. Listening becomes a visible reading exercise on explicit request when audio is unavailable; no false pronunciation assessment. No microphone or paid AI services. A web manifest supports installation where the browser offers it; offline operation and automatic device sync are outside this release.

Success: finish lessons with feedback and retry of mistakes, resume an interrupted lesson, retain progress after reload, review due phrases, search the dictionary, change level/theme/goals and export/import validated progress. Verify engine invariants with Node tests and main user flows at desktop and mobile in browser. Publish owner-private using Sites and return the verified URL.
