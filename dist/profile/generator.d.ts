import type { Profile } from "../types.js";
/**
 * Generate a complete fake user profile.
 *
 * @param params - Generation options.
 * @param params.countryName - Full country name (e.g. "France"); a random country is used when omitted.
 * @param params.birthGender - "Male" or "Female"; drawn at random when omitted.
 * @returns A fully populated `Profile` object.
 * @throws Error when `countryName` matches no known country or when a dataset list is missing.
 */
export declare function generateFakeProfile(params: {
    countryName?: string;
    birthGender?: string;
}): Profile;
//# sourceMappingURL=generator.d.ts.map