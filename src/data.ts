import datasets from './datasets.json';

// export raw dataset for callers who want to peek or extend
export const rawDatasets = datasets;

export const countries: any[] = (datasets as any).countries;
export const preferencesPublicitaires: any = (datasets as any).adChoices;
export const continentsCountries: any = (datasets as any).continentsCountries;
