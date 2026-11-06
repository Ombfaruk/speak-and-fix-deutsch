# Sprich & Fix

German (Goethe A1) speaking practice with an AI conversation partner and a coach that hears your voice.
German version of Speak & Fix — same app, adapted for learning German from zero.
A single-file web app (PWA). No build step, no server.

## Features
- **Voice recording mode:** record an answer, Gemini hears the audio and gives grammar, pronunciation and fluency feedback
- **Live mode:** real-time voice conversation (Gemini Live API)
- Per-sentence grammar coach (articles, conjugation, word order, cases, negation), session reports with A1 progress estimates (0-100%), progress tracking, spaced review of your mistakes, study plans
- Works offline after the first load (the AI calls still need internet)
- Bengali and German interface

## Use it
1. Get a free API key from <https://aistudio.google.com/apikey>.
2. Open the site, paste the key in **Settings**, choose a voice model, tap the mic.
3. Use headphones. In Chrome on Android you can use **Add to Home screen** to install it.

## Two API keys (optional)
Settings has an optional second key for the coach. Leave it empty to use one key for everything. Rate limits are counted per Google Cloud project, so keys from two projects have separate counters. Check Google's current Gemini API terms before using several projects only to get around limits.

## Privacy
Your API key and history are stored only in your browser (`localStorage`). Requests go directly from your browser to Google. Do not share a build with your key inside it.

## Deploy on GitHub Pages
The repository name must be **`speak-and-fix`**, because `sw.js` and `manifest.webmanifest` use the path `/speak-and-fix/`.
1. Create a public repository named `speak-and-fix`.
2. Upload all files from this folder (keep the `.nojekyll` file and the `docs` folder).
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Your site: `https://<your-username>.github.io/speak-and-fix/`

## Updating
After changing `index.html`, increase the cache name in `sw.js` (`speak-and-fix-v2` → `v3`), otherwise phones keep showing the old version.

## Making an Android app
See [docs/app-setup-bn.md](docs/app-setup-bn.md) (Bengali).
