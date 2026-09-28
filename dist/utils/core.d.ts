import type { AdChoiceCategory } from "../data.js";
import type { CreditCardInfo, Preferences } from "../types";
/**
 * Return a random element from an array.
 *
 * @param arr - Non-empty array to pick from.
 * @returns A random element.
 * @throws Error when the array is empty.
 */
export declare function randomItem<T>(arr: T[]): T;
/**
 * Shuffle the elements of an array in place (Fisher–Yates).
 *
 * @param arr - Array to shuffle.
 * @returns The same array, shuffled.
 */
export declare function shuffleArray<T>(arr: T[]): T[];
/**
 * Generate an RFC4122 v4 random UUID string.
 *
 * @returns A UUID string.
 */
export declare function randomUUID(): string;
/**
 * Generate a random password of given length composed of letters and numbers.
 *
 * @param length - Desired password length (default 12).
 * @returns The generated password.
 */
export declare function generatePassword(length?: number): string;
/**
 * Return a random date between two given dates.
 *
 * @param start - Lower bound (inclusive).
 * @param end - Upper bound (exclusive).
 * @returns A date in [start, end).
 */
export declare function randomDateBetween(start: Date, end: Date): Date;
/**
 * Build a fake phone number by appending 9 random digits to a country calling code.
 *
 * @param countryCode - Calling code prefix, e.g. "+33".
 * @returns The concatenated fake number.
 */
export declare function generatePhoneNumber(countryCode: string): string;
/**
 * Derive a plausible social-media handle from a person's names and base pseudo.
 *
 * @param name - First name.
 * @param surname - Last name.
 * @param pseudo - Base username.
 * @param mediaSocial - Target platform (e.g. "twitter", "instagram", "youtube"). Unknown platforms fall back to the lowercased pseudo.
 * @returns The generated handle (a YouTube channel ID for "youtube").
 * @throws Error when any parameter is missing.
 */
export declare function generateSocialHandleVariant(name: string, surname: string, pseudo: string, mediaSocial: string): string;
/**
 * Generate a string of random digits of the given length.
 *
 * @param length - Number of digits.
 * @returns The digit string.
 */
export declare function generateRandomDigits(length: number): string;
/**
 * Construct a believable email address using first and last name and a
 * random domain for the specified country code.
 * Falls back to all known domains when the country code has no mailbox entry.
 *
 * @param firstName - First name.
 * @param lastName - Last name.
 * @param countryCode - ISO country code used to pick the domain.
 * @returns The email address.
 * @throws Error when the first or last name is missing.
 */
export declare function buildCredibleEmailAddress(firstName: string, lastName: string, countryCode: string): string;
/**
 * Generate fake Luhn-valid credit-card data (Visa, Mastercard, American Express or Discover).
 * American Express numbers have 15 digits and a 4-digit CVV, other issuers 16 digits and a 3-digit CVV.
 *
 * @returns Card data with `cc`/`number`, `cvv`, `issuer` and expiration fields.
 */
export declare function generateCreditCard(): CreditCardInfo;
/**
 * Draw a username from the dataset pool without replacement until exhausted, then refill the pool.
 *
 * @returns A username string.
 */
export declare function getRandomUsername(): string;
/**
 * Generate a random adult birth date between 19 and 80 years ago.
 *
 * @returns A date between the two bounds.
 */
export declare function generateRandomDate(): Date;
/**
 * Compute full years of age for a birth date.
 *
 * @param birthDate - Birth date.
 * @returns Age in full years.
 */
export declare function getAge(birthDate: Date): number;
/**
 * Resolve a continent name from an ISO country code.
 *
 * @param countryCode - ISO country code, e.g. "US".
 * @returns The continent name, or "Unknown" when unmapped.
 */
export declare function getContinent(countryCode: string): string;
/**
 * Score ad-choice categories for a gender and return the top 15-20 as a preference map.
 * Pure: scores are computed on a copy, the input array is never mutated.
 *
 * @param categories - Ad-choice categories with base scores per gender.
 * @param gender - Gender used for scoring.
 * @returns Preference map of category name to score.
 * @throws Error when a category entry is empty.
 */
export declare function generatePreferences(categories: AdChoiceCategory[], gender: "Male" | "Female"): Preferences;
/**
 * Generate a random YouTube channel ID ("UC" followed by 22 characters).
 *
 * @returns The channel ID string.
 */
export declare function generateYouTubeChannelID(): string;
/**
 * Return a random integer in the half-open interval [min, max).
 *
 * @param min - Inclusive lower bound.
 * @param max - Exclusive upper bound.
 * @returns A random integer.
 */
export declare function range(min: number, max: number): number;
//# sourceMappingURL=core.d.ts.map