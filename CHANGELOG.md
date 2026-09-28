# Changelog

All notable changes to this project are documented in this file.

## [1.1.0] - 2026-09-28

### Fixed

- **build**: recreated missing `src/profile/constants.ts` (`sexualities` list, deduplicated) which `profile/index.ts` referenced — `tsc` was broken; `generateFakeProfile` no longer hits an undefined global.
- **generator**: unknown `countryName` now throws a descriptive error listing valid countries instead of `TypeError` on `undefined.abbreviation`; the `Unknown`-continent retry loop is bounded to 10 attempts; country drawing uses `randomItem`.
- **csv**: `composeCSVFile` emits exactly one column per field (34 columns matching the header) with RFC-4180 escaping; previously `social_media` and `credit_card` were pre-joined with `;`, shifting every subsequent column and producing unparsable CSV.
- **core**:
  - `shuffleArray`: dropped the truthiness guard that skipped falsy values (`0`, `""`, `false`) — plain Fisher–Yates again.
  - `generatePreferences`: pure now — scores on a copy, no more in-place mutation/sort of caller data.
  - `buildCredibleEmailAddress`: falls back to all known domains when the country code has no mailbox entry.
  - `getRandomUsername`: draws without replacement until the pool is exhausted (no more immediate duplicates).
  - `generateSocialHandleVariant`: `twitter` picks from its variations; added the missing `leagueoflegends` case.
  - `generateRandomDate`: explicit 19–80y bounds via `randomDateBetween`.
  - `randomItem`: throws on empty arrays instead of returning `undefined`.
- **card**: Luhn check digit recomputed correctly (previous parity formula produced invalid numbers); American Express cards keep their 15 digits / 4-digit CVV instead of being regenerated until 16 chars; CVV can now contain `9`; dropped the dead `_firstDigits` variable.
- **batch**: `generateAndComposeCSV` handles non-divisible totals exactly (remainder chunk), validates integer sizes with descriptive errors, replaces `console.log` with an optional `onProgress` callback, and composes CSV per chunk (single header) instead of holding all profiles in memory.
- **tests**: Amex-aware card expectations — fixes a ~25% flaky failure (`generateCreditCard returns valid-looking number` assumed 3-digit CVVs).

### Changed

- `CreditCardInfo` objects now always include both `cc` and `number` fields (kept in sync).
- `generateAndComposeCSV` accepts an optional `onProgress(generated, total)` callback.
- `Sexuality` enum: removed the `Queerplatonic2` duplicate value.
- `Datasets` typing: `AdChoiceCategory`, `CountryDataset`, typed `common.passwords`; new `getCountryDataset` / `getCountryList` typed accessors with descriptive errors.
- Base64 encoding of `adChoices` is runtime-agnostic (`Buffer` in Node, `btoa` + `TextEncoder` fallback in browsers).
- `package.json`: removed the `fake-data-npm` self-dependency and the stale `jest`/`ts-jest` config; `npm test` runs `bun test ./tests` (12 tests).
- `biome.json`: lints `src/**/*.ts`, excludes the 5 MB `datasets.json`.
- `tsc`: zero errors under `noUncheckedIndexedAccess`; `biome lint`: zero warnings; no `as any` left in `src/`.

### Docs

- Complete JSDoc for every public export (`@param` / `@returns` / `@throws`), including all `Profile`, `Location`, `Passwords` and `CreditCardInfo` fields.
- Line endings normalized to LF, quote style normalized via `biome format`.
