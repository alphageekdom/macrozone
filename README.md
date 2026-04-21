# MacroZone

A simple, native-feeling macro tracker for iOS. Log meals, track daily calorie and macro totals, and get reminded to eat — all stored locally on device, no account required.

Built with Expo + React Native + TypeScript.

<!-- Add screenshots here -->
<!-- <img src="./docs/screenshots/home.png" width="300" /> -->

## Features

- **Log meals** — name, calories, protein, carbs, and fat, with NaN/negative validation
- **Daily macro dashboard** — live totals computed from saved meals, formatted with thousands separators
- **Recent meals** — long-press any meal to delete it (with confirmation)
- **Full meals list** — view everything ever logged, with bulk "Clear All"
- **Export summary** — copy to clipboard or share via native share sheet
- **Daily reminders** — optional local notifications at lunch (12:00) and dinner (18:00)
- **Haptic feedback** — success haptics on meal add and delete
- **Themed UI** — custom dark palette, consistent across all screens

## Tech Stack

- **[Expo SDK 55](https://expo.dev)** + **[expo-router](https://docs.expo.dev/router/introduction/)** for file-based navigation
- **TypeScript** throughout, with typed storage and helper modules
- **AsyncStorage** for local persistence (meals + user preferences)
- **expo-notifications** for scheduled local reminders
- **expo-haptics** for tactile feedback
- **expo-clipboard** and React Native **Share** for export
- **expo-crypto** for UUID generation

## Project Structure

```
src/
├── app/                     # expo-router screens
│   ├── _layout.tsx          # Root layout + notification handler setup
│   └── (tabs)/              # Tab group: Home, Add Meal, All Meals
├── components/              # Reusable view components
│   ├── MacroCard.tsx
│   ├── MacroGrid.tsx        # Dashboard totals grid
│   ├── MealItem.tsx         # Single meal row with long-press delete
│   ├── RecentMeals.tsx
│   ├── CopyButton.tsx
│   ├── ShareButton.tsx
│   └── ReminderToggle.tsx
├── storage/                 # AsyncStorage-backed persistence
│   ├── meals.ts             # CRUD for meals
│   └── preferences.ts       # User preferences (reminder toggle)
├── lib/                     # Pure utilities (no side effects)
│   ├── format.ts            # Number formatting
│   └── totals.ts            # Macro totals + summary text
├── utils/                   # Side-effectful helpers
│   └── notifications.ts     # Configure / request / schedule
└── styles/
    └── global.ts            # Theme colors and shared styles
```

The split between `lib/` (pure) and `utils/` (effectful) keeps the math layer trivially testable and framework-independent.

## Getting Started

### Prerequisites

- Node 20+
- iOS Simulator (Xcode) or a physical iOS device with [Expo Go](https://expo.dev/go)

### Install & run

```bash
npm install
npx expo start
```

Press `i` to open in iOS Simulator, or scan the QR code with Expo Go.

### Full notification testing

`expo-notifications` is partially limited in Expo Go. For production-accurate testing, build a development client:

```bash
npx expo prebuild
npx expo run:ios --device
```

## Architecture Notes

- **Storage is typed and centralized.** All AsyncStorage access goes through `src/storage/*` — components never touch AsyncStorage directly. Changing the storage backend later (SQLite, server sync) would mean editing one file.
- **Helpers are pure where possible.** `computeTotals`, `buildSummaryText`, and `formatNumber` are pure functions with no framework or side-effect dependencies. They could be unit-tested or lifted into another project as-is.
- **Notification handler setup runs once at app mount** (in `_layout.tsx`), not at module import time — avoids import-order side effects.
- **Form validation happens at the boundary.** NaN and negative checks are in the add-meal form, so the storage layer can trust its inputs.
- **No over-abstraction.** One screen, one file; one responsibility per module. No premature interfaces, no state-management library — `useState` + `useFocusEffect` does the job at this scale.

## Roadmap / Known Limitations

- iOS only (Android permission flow not wired up)
- Goals are hardcoded (2,000 cal / 150g P / 250g C / 65g F) — no user-configurable targets yet
- Reminder times (12:00 / 18:00) are hardcoded — no user-configurable schedule
- No per-day filtering — all meals shown together
- No cloud sync — data is device-local

## License

MIT
