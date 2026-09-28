import datasets from "./datasets.json";

export interface Country {
	name: string;
	abbreviation: string;
	phoneCode: string;
	continent: string;
}

export interface CountryDataset {
	male_first?: string[];
	female_first?: string[];
	last?: string[];
	street?: string[];
	cities?: string[];
	states?: string[];
	[key: string]: unknown;
}

export type AdChoiceCategory = Record<string, Record<"Male" | "Female", number>>;

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

// export raw dataset for callers who want to peek or extend
export const rawDatasets: Datasets = datasets as unknown as Datasets;

export const countries = rawDatasets.countries;
export const preferencesPublicitaires = rawDatasets.adChoices;
export const continentsCountries = rawDatasets.continentsCountries;
export const mailboxes = rawDatasets.mailboxes;

/** Typed access to a per-country dataset (names, streets, cities, ...). */
export function getCountryDataset(abbreviation: string): CountryDataset {
	const entry = rawDatasets[abbreviation];
	if (!entry || typeof entry !== "object") {
		throw new Error(`No dataset for country code "${abbreviation}"`);
	}
	return entry as CountryDataset;
}

/** Pick a non-empty string list from a country dataset, or throw. */
export function getCountryList(dataset: CountryDataset, key: string, abbreviation: string): string[] {
	const list = dataset[key];
	if (!Array.isArray(list) || list.length === 0 || !list.every((v): v is string => typeof v === "string")) {
		throw new Error(`Dataset "${abbreviation}" has no usable list "${key}"`);
	}
	return list;
}
