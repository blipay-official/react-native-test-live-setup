# Credit Analyses (React Native) — setup

This repository contains **no interview code**. It only proves that your environment can install the dependencies,
run the mock API and build the app on an Android emulator or iOS simulator. Please do this **the day before** the
interview and reply to confirm it worked. On the day, we'll add you to a second repository with the real codebase; a
single `git fetch` brings it into this same folder (same dependencies, nothing to reinstall).

## Prerequisites

- Node 20+
- Android: Android Studio with an emulator, JDK 17+ and `ANDROID_HOME` set
- iOS (macOS only): Xcode 26.0+ with an iPhone simulator, and CocoaPods

## Steps

1. Install the dependencies:

       npm install

2. Start the mock API in one terminal (port 3000) and keep it open:

       npm run mock-api

3. Build and start the app in another terminal (the first build takes a few minutes):

       npm run android     # builds and installs on the running emulator, then starts Metro
       npm run ios         # macOS only: builds and installs on the booted simulator

   You should see **"Setup OK: the app reached the mock API"**.

   On later runs `npm start` is enough: it starts Metro for the development build (`expo-dev-client`) and
   `a` / `i` open the installed app. Expo Go is not supported.

   If `pod install` fails with `Unicode Normalization not appropriate for ASCII-8BIT`, your shell has no UTF-8
   locale: run `export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8` and try again.

   If the app can't reach the mock, point it explicitly and try again:

       EXPO_PUBLIC_API_URL=http://<your-machine-ip>:3000 npm start

4. Run the tests and the type check:

       npm test
       npm run typecheck

If anything fails, tell us — we'd much rather sort it out a day early than lose interview time to a build error.

See `CANDIDATE_PROMPT.md` for what to expect in the interview.
