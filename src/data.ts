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
