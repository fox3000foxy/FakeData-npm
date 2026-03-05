import datasets from './datasets.json';
// export raw dataset for callers who want to peek or extend
export const rawDatasets = datasets;
export const countries = rawDatasets.countries;
export const preferencesPublicitaires = rawDatasets.adChoices;
export const continentsCountries = rawDatasets.continentsCountries;
