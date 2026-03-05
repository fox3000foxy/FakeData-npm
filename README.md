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

```bash
git clone <repo>
cd FakeData-npm
npm install
npm run build     # output in `dist/`
npm run clean     # remove build output
```

## Usage

```ts
import { generateFakeProfile } from 'fake-data-npm';

const profile = generateFakeProfile({ countryName: 'France', birthGender: 'female' });
console.log(profile); // JSON string

// other helpers:
import {
  randomItem,
  generatePhoneNumber,
  generateSocialHandleVariant,
  ...
} from 'fake-data-npm';

console.log(generatePhoneNumber('+33')); // +33xxxxxxxxx
```

You can also generate batches and export CSV:

```ts
import { generateAndComposeCSV } from 'fake-data-npm';
const csv = generateAndComposeCSV(1000, 100, {});
console.log(csv.split('\n').length);
```

## API

| Function | Description |
|----------|-------------|
| `randomItem(arr)` | Return random element from array |
| `generatePhoneNumber(countryCode)` | Fake phone number |
| `generateSocialHandleVariant(name,surname,pseudo,media)` | Variant 
| `generateRandomDigits(length)` | String of digits |
| `buildCredibleEmailAddress(first,last,country)` | Email generator |
| `generateCreditCard()` | Fake CC data |
| `getRandomUsername()` | Get from internal list |
| `generateRandomDate()` | Random adult birthdate |
| `getAge(date)` | Age from birthdate |
| `getContinent(code)` | Continent from country code |
| `generatePreferences(categories,gender)` | Ad preference map |
| `generateFakeProfile(params)` | Full profile JSON string |
| `generateFakeProfilesBatch(batchSize,params)` | Array of profiles |
| `generateAndComposeCSV(total,batch,params)` | CSV string of profiles |
| `composeCSVFile(data)` | Convert profiles to CSV |
| `writeCSVFile(fname,content)` | Write CSV to disk |

Refer to inline JSDoc and generated `.d.ts` for detailed types.

## License

MIT
