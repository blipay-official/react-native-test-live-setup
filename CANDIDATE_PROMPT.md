# React Native Technical Interview — What to Expect

Thanks for your interest in joining us. Your technical interview is a **60-minute live code review and debugging
session**. There's no take-home and nothing to prepare beyond the setup step below.

## What you'll be doing

We'll give you a small React Native app used by credit analysts: it lists credit analyses from a local mock API, shows
a detail screen that follows pending analyses, and lets the analyst submit a new one. It's built with TypeScript,
React Navigation, and it has some layering — an HTTP client, one `resources/` module per
domain, presentational components, etc.

It works, mostly. It also has problems.

You'll explore it with us and tell us what you'd flag if it arrived in your code review queue: bugs, architecture
concerns, things that would break on a real device. Then you'll fix a couple of the issues live.

## Format

- 5 min — introductions, confirm your setup, get oriented
- 20 min — code review and discussion, the main part
- 20 min — debug and fix a specific issue
- 10 min — a second, optional fix if there's time
- 5 min — your questions for us

The code review is where most of the signals are. The fixes matter, but we're more interested in how you reason about the
code than in how many lines you produce.

## AI tools are allowed — and we're interested in how you use them

Use whatever you'd normally use: Copilot, Claude, Cursor, ChatGPT, anything.

This isn't a trap or a tolerance. We work with these tools, and we want to see how you work with them. What we pay
attention to:

- **How you prompt** — does the prompt carry the constraints and context that matter?
- **How you validate** — do you run the tests, reason about edge cases, check the output?
- **Whether you can explain it** — can you defend a change and say why it's correct?

Using AI well is a strong signal. Pasting something you can't explain is not. Choosing not to use AI is also
completely fine and won't count against you.

## Setup — please do this 24 hours before

React Native environments take longer to set up than we want to spend during the interview, so we handle it in
advance.

The day before:

1. Clone the public repository `blipay-official/react-native-test-live-setup` (no invitation needed) — and send us
   your GitHub username, which we'll need on the day
2. Install dependencies, start the mock API and get the app running on an **Android emulator** or **iOS simulator**
3. Reply to confirm it worked

That repository contains no interview code. It exists purely to prove your environment is working. If anything
fails, tell us — we'd much rather sort it out a day earlier than lose interview time to a build error.

On the day: we'll add you to a second repository with the real codebase, and a single `git fetch` brings it into the
same folder — same dependencies, nothing to reinstall. You'll be seeing the code for the first time, which is the
point.

## What you'll need

- A machine with Node 20+ and an Android emulator or iOS simulator
- Your usual editor — use whatever you're fastest in
- Screen sharing

## What we're looking for

*How you navigate unfamiliar code.* Where you look first, how you build a mental model, what you ask about.

*Whether you can tell a serious problem from a cosmetic one.* We'd rather you find two real bugs and explain their
impact than list twelve style nits.

*How you reason about structure.* Where logic belongs, what depends on what, and what would make this codebase easy or
hard to grow.

*How you explain technical issues.* You'll be doing this with teammates constantly. Think out loud.

*Whether you think about the person using the app.* Most of our users are on mid-range Android phones, often on mobile
data. That context matters more here than it does in a lot of codebases.

## A few tips

Do:

- Think out loud — we can't assess reasoning we can't hear
- Ask questions about the product, the constraints, anything that's unclear
- Run the app, keep the mock API logs visible, and run the tests
- Go after the most impactful issues first
- Say when you're unsure. "I'd need to check how this behaves on Android" is a good answer

Don't:

- Worry about finding every issue — nobody does, and it isn't the bar
- Spend the session on formatting and naming
- Try to build something elaborate during the fixes
- Treat this as a test you're being graded through. It's a conversation about code with people who'd like to work with
  you

## Questions?

If anything about the format or the setup is unclear, or you need to reschedule, just reach out. We'd rather answer now
than have you guessing.

Looking forward to it.
