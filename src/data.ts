import datasets from './datasets.json' assert { type: 'json' };

export interface Datasets {
    countries: Array<{ name: string; abbreviation: string; phoneCode: string; continent: string }>;
    adChoices: any;
    continentsCountries: Record<string, string[]>;
    mailboxes: Record<string, string[]>;
    usernames: string[];
    common: any;
    [key: string]: any; // allow extra country-specific keys
}

// export raw dataset for callers who want to peek or extend
export const rawDatasets: Datasets = datasets as any;

export const countries = rawDatasets.countries;
export const preferencesPublicitaires = rawDatasets.adChoices;
export const continentsCountries = rawDatasets.continentsCountries;
