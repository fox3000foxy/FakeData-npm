/**
 * Return a random element from an array.
 * @template T
 * @param {T[]} arr - array to pick from
 * @returns {T} random element
 */
export declare function randomItem<T>(arr: T[]): T;
/**
 * Generate a random phone number string with the provided country code.
 * @param {string} countryCode
 * @returns {string}
 */
export declare function generatePhoneNumber(countryCode: string): string;
/**
 * Generate a social media handle variant based on name, surname and base pseudo.
 * Supported platforms include twitter, instagram, facebook, etc.
 * @param {string} name
 * @param {string} surname
 * @param {string} pseudo
 * @param {string} mediaSocial
 * @returns {string}
 */
export declare function generateSocialHandleVariant(name: string, surname: string, pseudo: string, mediaSocial: string): string;
/**
 * Generate a string of random digits of the given length.
 * @param {number} length
 * @returns {string}
 */
export declare function generateRandomDigits(length: number): string;
/**
 * Construct a believable email address using first and last name and a
 * random domain for the specified country code.
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} countryCode
 * @returns {string}
 */
export declare function buildCredibleEmailAddress(firstName: string, lastName: string, countryCode: string): string;
/**
 * Generate a fake credit card number, CVV, issuer, expiry year and month.
 * @returns {{cc:string,cvv:string,issuer:string,exp_year:number,exp_month:number}}
 */
export declare function generateCreditCard(): {
    cc: string;
    cvv: string;
    issuer: string;
    exp_year: number;
    exp_month: number;
};
export declare function getRandomUsername(): string;
/**
 * Generate a random birthdate for an adult (between 19 and 80 years ago).
 * @returns {Date}
 */
export declare function generateRandomDate(): Date;
export declare function getAge(birthDate: Date): number;
export declare const countries: any[];
export declare function getContinent(countryCode: string): string;
/**
 * Generate a sorted map of ad preference scores based on categories and gender.
 * @param {any[]} categories
 * @param {'Male'|'Female'} gender
 * @returns {Record<string, number>}
 */
export declare function generatePreferences(categories: any[], gender: 'Male' | 'Female'): any;
export declare function generateYouTubeChannelID(): string;
/**
 * Generate a fake user profile as a JSON string.
 * @param {{countryName?:string,birthGender?:string}} params
 * @returns {string}
 */
export declare function generateFakeProfile(params: {
    countryName?: string;
    birthGender?: string;
}): string;
/**
 * Generate an array of fake profiles.
 * @param {number} batchSize
 * @param {{countryName?:string,birthGender?:string}} params
 * @returns {any[]}
 */
export declare function generateFakeProfilesBatch(batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): any[];
export declare function range(min: number, max: number): number;
export declare function composeCSVFile(data: any[]): string;
export declare function generateAndComposeCSV(totalProfiles: number, batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): string;
export declare function writeCSVFile(filename: string, content: string): void;
//# sourceMappingURL=index.d.ts.map