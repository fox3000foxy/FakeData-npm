export interface Datasets {
    countries: Array<{
        name: string;
        abbreviation: string;
        phoneCode: string;
        continent: string;
    }>;
    adChoices: any;
    continentsCountries: Record<string, string[]>;
    mailboxes: Record<string, string[]>;
    usernames: string[];
    common: any;
    [key: string]: any;
}
export declare const rawDatasets: Datasets;
export declare const countries: {
    name: string;
    abbreviation: string;
    phoneCode: string;
    continent: string;
}[];
export declare const preferencesPublicitaires: any;
export declare const continentsCountries: Record<string, string[]>;
//# sourceMappingURL=data.d.ts.map