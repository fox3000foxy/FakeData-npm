import { Profile } from './types';
/**
 * Generate a fake user profile object.
 * @param params
 */
export declare function generateFakeProfile(params: {
    countryName?: string;
    birthGender?: string;
}): Profile;
export declare function generateFakeProfilesBatch(batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): Profile[];
export declare function generateAndComposeCSV(totalProfiles: number, batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): string;
//# sourceMappingURL=profile.d.ts.map