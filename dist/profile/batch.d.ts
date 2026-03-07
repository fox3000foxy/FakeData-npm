import type { Profile } from '../types.js';
export declare function generateFakeProfilesBatch(batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): Profile[];
export declare function generateAndComposeCSV(totalProfiles: number, batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): string;
//# sourceMappingURL=batch.d.ts.map