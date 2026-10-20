# Fantasy Character Creator

A browser-based fantasy character forge built with React, Vite, TypeScript and Tailwind CSS. Roll up a complete adventurer - name, class, race, alignment, ability scores, signature abilities, equipment, lore and portrait - then collect the results into a personal deck.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![GitHub Issues](https://img.shields.io/github/issues/nexus-devs-innovations/fantasy-character-creator)](https://github.com/nexus-devs-innovations/fantasy-character-creator/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/nexus-devs-innovations/fantasy-character-creator)](https://github.com/nexus-devs-innovations/fantasy-character-creator/pulls)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## Overview

Fantasy Character Creator is a fully client-side web app for tabletop role-players, writers and game designers who need a believable character in seconds. Every roll produces a self-consistent character: the ability scores, hit points, armour class and equipment all follow the chosen class, and the generated backstory and quote are written around that class, race and alignment.

There is no backend and no account. Characters are saved to `localStorage`, so your deck persists between visits without any data leaving the browser.

## Features

### Character Forge
- Randomised generation across 10 classes and 8 races, with 9 alignments.
- D&D-style ability scores (STR, DEX, CON, INT, WIS, CHA) with computed modifiers.
- Signature abilities, equipment (weapon, armour, relic), backstory and a character quote.
- Selective locking: lock the name, class, race or stats and re-roll only what you want to change.
- Card rarity tiers (Rare, Epic, Legendary) driven by the rolled stat spread.

### Player Card and Deck
- A collectible-style player card view with health, mana and core stats.
- Save any character to a personal deck, mark favourites, and revisit them later.
- Deck persistence via `localStorage` - no login, no server round-trip.

### Class Compendium
- Browsable reference for every class: role, hit die, primary stat and signature abilities.

### Dice Sandbox
- Interactive dice rolling with animated results for use at the table.

### Portrait Styles
- Multiple portrait style presets (cel-shaded, chibi, arcade, pixel) with per-class theme colours.
- Regeneration cycles through the available portrait variants for the selected class.

### Polish
- Web Audio API sound effects synthesised in-browser (dice rolls, chimes) with a mute toggle.
- Responsive, keyboard-friendly layout with a medieval-inspired type system.

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | lucide-react |
| Animation | motion |
| Audio | Web Audio API (no audio assets) |
| Persistence | Browser `localStorage` |
| Type checking | `tsc --noEmit` |

The app has no runtime dependencies beyond the browser - no server, no database, no API keys.

## Project Structure

```
fantasy-character-creator/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── pull_request_template.md
│   └── workflows/
│       └── pr-review.yml
├── src/
│   ├── assets/images/        # Class portraits, banners and backgrounds
│   ├── components/
│   │   ├── CharacterCard.tsx
│   │   ├── ClassCompendium.tsx
│   │   ├── DiceSandbox.tsx
│   │   ├── GeneratorControls.tsx
│   │   ├── Header.tsx
│   │   ├── MyDeckView.tsx
│   │   ├── PlayerCard.tsx
│   │   └── RosterDrawer.tsx
│   ├── data/characterData.ts # Class definitions, name/race pools, generators
│   ├── types/character.ts    # Shared domain types
│   ├── utils/
│   │   ├── audio.ts
│   │   └── cartoonAvatarGenerator.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm (bundled with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nexus-devs-innovations/fantasy-character-creator.git
   cd fantasy-character-creator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app is served at `http://localhost:3000`.

No environment variables are required.

### Production build

```bash
npm run build
npm run preview
```

The static bundle is written to `dist/` and can be served from any static host.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the project with `tsc --noEmit` |
| `npm run clean` | Remove the `dist/` build output |

## Contributing

Contributions are very welcome - bug reports, feature requests and pull requests alike. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, branch naming conventions and the pull request workflow, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

- Found a bug? [Open a bug report](https://github.com/nexus-devs-innovations/fantasy-character-creator/issues/new?template=bug_report.md).
- Have an idea? [Open a feature request](https://github.com/nexus-devs-innovations/fantasy-character-creator/issues/new?template=feature_request.md).

## Maintainers

This project is maintained by [Nexus Devs Innovations](https://github.com/nexus-devs-innovations).
Open an issue or a pull request in this repository to reach the maintainers, or start a
discussion in the organization.

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Krish Sharma.
