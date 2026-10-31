# Danskdag 1.7.1

Speech buttons now acknowledge a tap immediately and show preparation, actual playback, completion or error. Browser start/end/error events drive the state; request identity prevents delayed events from changing a newer control. Cancellation clears the previous indication. A ten-second startup timeout handles a synthesizer that never starts. Reduced motion keeps colour/text feedback while suppressing movement. The device voice provider is unchanged.

Text and speaker in Danish phrases form one semantic button. Sound controls have a minimum 44-pixel tap area. Automatically added controls retain rich word highlighting and exclude Russian translations from speech. The Russian settings preview remains outside its Danish button on its own line.

The whole lower row in meaning/class cards is now a semantic button. Meaning, class, lesson and dictionary card backgrounds activate their primary action; embedded buttons, links, form fields, disclosures and selected text remain separate. Reference rows already expand through their whole summary. Choice and sentence-token controls retain separate audio and answer actions.

The existing 30-entry informal reference is labelled «Сленг и ругательства», with a direct shortcut from «Живая речь». The existing conversational phrases, idioms, register notes and original progress identities remain intact. No new corpus-coverage claim or unreviewed slang was added.

Browser QA used 360-pixel dark/20-pixel text layouts. Clicking the text of «tager noget på» triggered the speech control without opening the card. A controlled test synthesizer confirmed the actual speaking phase and audio-wave animation; the button measured 44 pixels high. Clicking «6 значений · к практике» opened all six tager senses, and clicking the card header also opened that family. Navigating cleared the active indicator. The natural browser, which has no Danish voice, showed error feedback and the existing explanation. Settings preview kept its separate Russian line. The slang shortcut opened the 30-entry reference. Actual Danish voice quality was not tested on this QA device. Temporary speech fixtures are excluded from production and release files.

Primary API references: [utterance events](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance), [start](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/start_event), [end](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/end_event), [errors](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisErrorEvent/error).

Final checks: 193 automated tests passed, 94 module syntax checks passed, git diff --check passed, and the production Worker build contains 93 assets. Independent code review found no blocking issue; the reported preview translation styling issue was corrected and checked in the browser.
