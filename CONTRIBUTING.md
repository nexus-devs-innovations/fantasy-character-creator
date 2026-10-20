# Contributing to Fantasy Character Creator

Thanks for taking the time to contribute. This guide covers everything you need to go from a fresh clone to a merged pull request.

By participating in this project you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Local Setup](#local-setup)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Messages](#commit-messages)
- [Pull Request Workflow](#pull-request-workflow)
- [Code Standards](#code-standards)
- [Testing Your Change](#testing-your-change)
- [Reporting Bugs and Requesting Features](#reporting-bugs-and-requesting-features)

---

## Ways to Contribute

- Report bugs using the bug report template.
- Propose features or improvements using the feature request template.
- Improve documentation, comments or examples.
- Submit pull requests for open issues - comment on the issue first so work is not duplicated.

## Local Setup

**Prerequisites:** Node.js 20 or newer and npm.

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/fantasy-character-creator.git
cd fantasy-character-creator

# 2. Add the upstream remote so you can stay in sync
git remote add upstream https://github.com/nexus-devs-innovations/fantasy-character-creator.git

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The app runs at `http://localhost:3000`. No environment variables or API keys are required - the app is entirely client-side.

Keep your fork current before starting work:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Branch Naming Conventions

Always branch off an up-to-date `main`. Use one of the following prefixes:

| Prefix | Use for | Example |
| --- | --- | --- |
| `feature/` | New functionality | `feature/character-export-json` |
| `bugfix/` | Fixing a defect | `bugfix/dice-roll-double-count` |
| `hotfix/` | Urgent fix against production | `hotfix/broken-portrait-path` |
| `docs/` | Documentation only | `docs/update-setup-guide` |
| `refactor/` | Behaviour-preserving cleanup | `refactor/extract-stat-roller` |
| `chore/` | Tooling, deps, config | `chore/bump-vite` |
| `test/` | Adding or fixing tests | `test/cover-stat-generator` |

Guidelines:

- Use lowercase with hyphens: `feature/class-compendium-filter`.
- Keep it short but descriptive - aim for three to five words.
- Reference the issue number where useful: `bugfix/142-deck-duplicate-entries`.

## Commit Messages

Write clear, imperative commit messages:

```
<type>(<scope>): <short summary>
```

Examples:

```
feat(forge): add alignment lock to generator controls
fix(deck): prevent duplicate characters in saved deck
docs(readme): document available npm scripts
chore(deps): bump lucide-react to latest
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

## Pull Request Workflow

1. **Find or open an issue.** Check existing issues first. If none matches, open a feature request or bug report so the change can be discussed before you build it.
2. **Create your branch** from `main` using the naming convention above.
3. **Make your change** in small, focused commits.
4. **Verify locally** before pushing:

   ```bash
   npm run lint
   npm run build
   ```

5. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-branch-name
   ```

6. **Open a pull request** against `main` of the upstream repository. The PR template will prompt you for a summary, the linked issue and a testing checklist - please fill it in.
7. **Respond to review feedback.** Keep the discussion on the PR. Push follow-up commits to the same branch rather than opening a new PR.
8. **Merge.** A maintainer will squash-merge once the automated checks pass and the review is approved.

Please keep pull requests focused. One logical change per PR is far easier to review and merge than a large mixed bag.

## Code Standards

**General**

- Write TypeScript for all new code. Avoid `any`; prefer explicit types or `unknown` with narrowing.
- Keep components small and single-purpose. Extract shared logic into `src/utils/` and shared types into `src/types/`.
- Put new static content (classes, races, names, lore pools) in `src/data/characterData.ts` rather than inline in components.
- Reuse the existing class theme colours from `getThemeColorForClass` instead of hardcoding new ones.

**React**

- Use function components with hooks. No class components.
- Prefer derived state over duplicated state, and keep `useEffect` dependencies exhaustive.
- Guard `localStorage` and Web Audio access so the app degrades gracefully when they are unavailable.
- Keep side effects out of render.

**Styling**

- Use Tailwind CSS utility classes. Avoid ad-hoc CSS unless a utility cannot express it.
- Keep the design responsive down to small mobile widths.
- Respect the existing medieval-inspired type scale and colour tokens in `src/index.css`.

**Accessibility**

- Interactive elements must be reachable and operable by keyboard.
- Provide `aria-label` text for icon-only buttons.
- Maintain sufficient colour contrast against the dark theme.

**Formatting**

- Two-space indentation, single quotes, semicolons.
- Keep lines reasonably short and remove unused imports before committing.

## Testing Your Change

Before opening a pull request:

1. Run the type checker:

   ```bash
   npm run lint
   ```

2. Run a production build to confirm nothing breaks at bundle time:

   ```bash
   npm run build
   ```

3. Manually exercise the affected flow in the browser (forge, deck, compendium and dice tabs) and check the browser console for errors.

The automated `PR Review` workflow runs the same type-check and build on every pull request, so a green run locally means a green run in CI.

## Reporting Bugs and Requesting Features

- Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) for defects. Include reproduction steps, expected vs actual behaviour, and your browser and OS.
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) for proposals. Describe the problem first, then the proposed solution.

Thanks again for contributing.
