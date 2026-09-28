/**
 * Country reference entry (display name, ISO code, calling code, continent).
 */
export interface Country {
    name: string;
    abbreviation: string;
    phoneCode: string;
    continent: string;
}
/**
 * Per-country name/address pools. Each list may be absent for a given country.
 */
export interface CountryDataset {
    male_first?: string[];
    female_first?: string[];
    last?: string[];
    street?: string[];
    cities?: string[];
    states?: string[];
    [key: string]: unknown;
}
/**
 * Ad-choice category with a base score per gender.
 */
export type AdChoiceCategory = Record<string, Record<"Male" | "Female", number>>;
/**
 * Shape of `datasets.json`: reference tables plus one `CountryDataset` per ISO country code.
 */
export interface Datasets {
    countries: Country[];
    adChoices: AdChoiceCategory[];
    continentsCountries: Record<string, string[]>;
    mailboxes: Record<string, string[]>;
    usernames: string[];
    common: {
        passwords: string[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
/** Raw dataset for callers who want to peek or extend the built-in pools. */
export declare const rawDatasets: Datasets;
/**
 * List of supported countries.
 */
export declare const countries: Country[];
/**
 * Ad-choice categories used to build `Profile.adChoices`.
 */
export declare const preferencesPublicitaires: AdChoiceCategory[];
/**
 * Continent lookup: continent name to ISO country codes.
 */
export declare const continentsCountries: Record<string, string[]>;
/**
 * Email domains keyed by ISO country code.
 */
export declare const mailboxes: Record<string, string[]>;
/**
 * Typed access to a per-country dataset (names, streets, cities, ...).
 *
 * @param abbreviation - ISO country code, e.g. "FR".
 * @returns The country dataset.
 * @throws Error when no dataset exists for the code.
 */
export declare function getCountryDataset(abbreviation: string): CountryDataset;
/**
 * Pick a non-empty string list from a country dataset.
 *
 * @param dataset - Country dataset to read from.
 * @param key - List key, e.g. "cities" or "male_first".
 * @param abbreviation - ISO country code, used in error messages.
 * @returns The string list.
 * @throws Error when the list is missing, empty or not all strings.
 */
export declare function getCountryList(dataset: CountryDataset, key: string, abbreviation: string): string[];
//# sourceMappingURL=data.d.ts.map