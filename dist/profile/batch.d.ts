import type { Profile } from "../types.js";
/**
 * Generate a batch of fake profiles.
 *
 * @param batchSize - Number of profiles to generate (non-negative integer).
 * @param params - Options forwarded to `generateFakeProfile`.
 * @returns Array of `batchSize` profiles.
 * @throws Error when `batchSize` is not a non-negative integer.
 */
export declare function generateFakeProfilesBatch(batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}): Profile[];
/**
 * Generate profiles in chunks and compose them into a single CSV string.
 * Only one header row is emitted, whatever the number of chunks.
 *
 * @param totalProfiles - Total number of profiles (non-negative integer).
 * @param batchSize - Profiles per chunk (positive integer); the last chunk holds the remainder.
 * @param params - Options forwarded to `generateFakeProfile`.
 * @param onProgress - Optional callback invoked with `(generated, total)` after each chunk.
 * @returns CSV string with a single header row.
 * @throws Error when sizes are not valid integers.
 */
export declare function generateAndComposeCSV(totalProfiles: number, batchSize: number, params: {
    countryName?: string;
    birthGender?: string;
}, onProgress?: (generated: number, total: number) => void): string;
//# sourceMappingURL=batch.d.ts.map