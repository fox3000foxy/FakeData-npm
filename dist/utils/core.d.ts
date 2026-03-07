import type { CreditCardInfo, Preferences } from '../types';
/** Return a random element from an array. */
export declare function randomItem<T>(arr: T[]): T;
/** Shuffle the elements of an array in place (Fisher–Yates). */
export declare function shuffleArray<T>(arr: T[]): T[];
/** Generate a RFC4122 v4 random UUID string. */
export declare function randomUUID(): string;
/** Generate a random password of given length composed of letters/numbers. */
export declare function generatePassword(length?: number): string;
/** Return a random Date between two given dates. */
export declare function randomDateBetween(start: Date, end: Date): Date;
export declare function generatePhoneNumber(countryCode: string): string;
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
export declare function generateCreditCard(): CreditCardInfo;
export declare function getRandomUsername(): string;
export declare function generateRandomDate(): Date;
export declare function getAge(birthDate: Date): number;
export declare function getContinent(countryCode: string): string;
export declare function generatePreferences(categories: any[], gender: 'Male' | 'Female'): Preferences;
export declare function generateYouTubeChannelID(): string;
export declare function range(min: number, max: number): number;
//# sourceMappingURL=core.d.ts.map