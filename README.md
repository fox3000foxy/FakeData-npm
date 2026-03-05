# fake-data-npm

> Library to generate fake profiles and related data

A tiny TypeScript/ESM utility for creating random person profiles, social
handles, emails, credit cards, etc.  Designed for use in Node projects and
bundlers; ships with type declarations and JSDoc for editor autocompletion.

---

## Installation

```bash
npm install fake-data-npm
# or with pnpm/yarn
```

The package is published as an ES module.  Ensure your environment supports
`import` (Node 14+ with `"type":"module"` or using a bundler).

## Build (for contributors)

Source lives in a `src` directory and is now organised into several
smaller modules (`types.ts`, `data.ts`, `utils/core.ts`, `utils/csv.ts`,
`profile.ts`).  Each subfolder contains a barrel (`utils/index.ts`) so you can
`import { composeCSVFile } from 'fake-data-npm/utils'` if desired.  The root
`src/index.ts` simply re‑exports everything.  TypeScript compiles everything to
`dist`.

```bash
git clone <repo>
cd FakeData-npm
npm install
npm run build     # compiles src/ → dist/
npm run clean     # remove build output
```

## Usage

```ts
import { generateFakeProfile } from 'fake-data-npm';

const profile = generateFakeProfile({ countryName: 'France', birthGender: 'female' });
console.log(profile); // Profile object with typed fields

// other helpers may be imported individually as needed, e.g.:
import { randomItem, generatePhoneNumber, generateSocialHandleVariant } from 'fake-data-npm';

console.log(generatePhoneNumber('+33')); // +33xxxxxxxxx
```

You can also generate batches (now typed as `Profile[]`) and export CSV:

> **CSV utilities**
> The CSV helpers live in a separate module; you can import them directly
> without pulling in the entire profile generator:
> ```ts
> import { composeCSVFile, writeCSVFile } from 'fake-data-npm/utils';
> ```


```ts
import { generateAndComposeCSV } from 'fake-data-npm';
const csv = generateAndComposeCSV(1000, 100, {});
console.log(csv.split('\n').length);
```

## API

| Function | Description |
|----------|-------------|
| `randomItem(arr)` | Return random element from array |
| `shuffleArray(arr)` | In-place Fisher–Yates shuffle |
| `randomUUID()` | RFC‑4122 v4 UUID string |
| `generatePassword(len?)` | Simple alphanumeric password |
| `generatePhoneNumber(countryCode)` | Fake phone number |
| `generateSocialHandleVariant(name,surname,pseudo,media)` | Variant |
| `generateRandomDigits(length)` | String of digits |
| `buildCredibleEmailAddress(first,last,country)` | Email generator |
| `generateCreditCard()` | Fake CC data |
| `getRandomUsername()` | Get from internal list |
| `generateRandomDate()` | Random adult birthdate |
| `randomDateBetween(start,end)` | Date between two bounds |
| `getAge(date)` | Age from birthdate |
| `getContinent(code)` | Continent from country code |
| `generatePreferences(categories,gender)` | Ad preference map |
| `generateFakeProfile(params)` | Full profile **object** (see `Profile` type) |
| `generateFakeProfilesBatch(batchSize,params)` | Array of profiles |
| `composeCSVFile(data)` | Convert profiles to CSV |
| `generateAndComposeCSV(total,batch,params)` | CSV string of profiles |
| `writeCSVFile(fname,content)` | Write CSV to disk |

Refer to inline JSDoc and generated `.d.ts` for detailed types.  The
package exports several interfaces (`Profile`, `Location`, `Passwords`, etc.)
for easier TypeScript consumption.

---

## Continuous integration

A GitHub Actions workflow (`.github/workflows/publish.yml`) builds the project
and publishes to npm when commits are pushed to `main`/`master` or a new
`vX.Y.Z` tag is created.  A repository secret named `NPM_TOKEN` is required to
authenticate with npm.

> **npm warning**
> When the action runs, npm may auto‑correct issues in `package.json` (for
> example normalising `repository.url` to `git+…`). Run `npm pkg fix` locally
> or update the field manually to avoid the warnings.

GitHub Packages publishing is conditional on the package being scoped (e.g.
`@owner/name`); unscoped names are not allowed and will raise a 405 error.

> **Dataset typing**
> A `Datasets` TypeScript interface describing `datasets.json` is exported from
> `fake-data-npm/data`.  Use `import type { Datasets } from 'fake-data-npm/data';`
> and refer to `rawDatasets` for strongly‑typed access to the underlying JSON.

## Testing

A simple Jest setup lives under `tests/`. To run the tests:

```bash
npm install   # if dependencies changed
npm test
```

This ensures future enhancements remain stable and provides examples of
utility usage.

## License

MIT
