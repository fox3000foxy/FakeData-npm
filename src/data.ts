import datasets from "./datasets.json";

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
	[key: string]: unknown; // allow extra country-specific keys
}

/** Raw dataset for callers who want to peek or extend the built-in pools. */
export const rawDatasets: Datasets = datasets as unknown as Datasets;

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
export function getCountryDataset(abbreviation: string): CountryDataset {
	const entry = rawDatasets[abbreviation];
	if (!entry || typeof entry !== "object") {
		throw new Error(`No dataset for country code "${abbreviation}"`);
	}
	return entry as CountryDataset;
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
export function getCountryList(dataset: CountryDataset, key: string, abbreviation: string): string[] {
	const list = dataset[key];
	if (!Array.isArray(list) || list.length === 0 || !list.every((v): v is string => typeof v === "string")) {
		throw new Error(`Dataset "${abbreviation}" has no usable list "${key}"`);
	}
	return list;
}
