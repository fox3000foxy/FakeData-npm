import datasets from "./datasets.json";
/** Raw dataset for callers who want to peek or extend the built-in pools. */
export const rawDatasets = datasets;
/**
 * List of supported countries.
 */
export const countries = rawDatasets.countries;
/**
 * Ad-choice categories used to build `Profile.adChoices`.
 */
export const preferencesPublicitaires = rawDatasets.adChoices;
/**
 * Continent lookup: continent name to ISO country codes.
 */
export const continentsCountries = rawDatasets.continentsCountries;
/**
 * Email domains keyed by ISO country code.
 */
export const mailboxes = rawDatasets.mailboxes;
/**
 * Typed access to a per-country dataset (names, streets, cities, ...).
 *
 * @param abbreviation - ISO country code, e.g. "FR".
 * @returns The country dataset.
 * @throws Error when no dataset exists for the code.
 */
export function getCountryDataset(abbreviation) {
    const entry = rawDatasets[abbreviation];
    if (!entry || typeof entry !== "object") {
        throw new Error(`No dataset for country code "${abbreviation}"`);
    }
    return entry;
}
/**
 * Pick a non-empty string list from a country dataset.
 *
 * @param dataset - Country dataset to read from.
 * @param key - List key, e.g. "cities" or "male_first".
 * @param abbreviation - ISO country code, used in error messages.
 * @returns The string list.
 * @throws Error when the list is missing, empty or not all strings.
 */
export function getCountryList(dataset, key, abbreviation) {
    const list = dataset[key];
    if (!Array.isArray(list) || list.length === 0 || !list.every((v) => typeof v === "string")) {
        throw new Error(`Dataset "${abbreviation}" has no usable list "${key}"`);
    }
    return list;
}
