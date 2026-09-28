import type { Profile } from "../types.js";
import { composeCSVFile } from "../utils/csv.js";
import { generateFakeProfile } from "./generator.js";

/**
 * Generate a batch of fake profiles.
 *
 * @param batchSize - Number of profiles to generate (non-negative integer).
 * @param params - Options forwarded to `generateFakeProfile`.
 * @returns Array of `batchSize` profiles.
 * @throws Error when `batchSize` is not a non-negative integer.
 */
export function generateFakeProfilesBatch(batchSize: number, params: { countryName?: string; birthGender?: string }): Profile[] {
	if (!Number.isInteger(batchSize) || batchSize < 0) {
		throw new Error(`batchSize must be a non-negative integer, got ${batchSize}`);
	}
	const profiles: Profile[] = [];
	for (let i = 0; i < batchSize; i++) {
		profiles.push(generateFakeProfile(params));
	}
	return profiles;
}

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
export function generateAndComposeCSV(
	totalProfiles: number,
	batchSize: number,
	params: { countryName?: string; birthGender?: string },
	onProgress?: (generated: number, total: number) => void,
): string {
	if (!Number.isInteger(totalProfiles) || totalProfiles < 0) {
		throw new Error(`totalProfiles must be a non-negative integer, got ${totalProfiles}`);
	}
	if (!Number.isInteger(batchSize) || batchSize <= 0) {
		throw new Error(`batchSize must be a positive integer, got ${batchSize}`);
	}
	const chunks: string[] = [];
	let generated = 0;
	const fullBatches = Math.floor(totalProfiles / batchSize);
	const remainder = totalProfiles % batchSize;
	for (let i = 0; i < fullBatches; i++) {
		const batch = generateFakeProfilesBatch(batchSize, params);
		generated += batch.length;
		onProgress?.(generated, totalProfiles);
		chunks.push(
			composeCSVFile(batch)
				.split("\n")
				.slice(chunks.length === 0 ? 0 : 1)
				.join("\n"),
		);
	}
	if (remainder > 0) {
		const batch = generateFakeProfilesBatch(remainder, params);
		generated += batch.length;
		onProgress?.(generated, totalProfiles);
		chunks.push(
			composeCSVFile(batch)
				.split("\n")
				.slice(chunks.length === 0 ? 0 : 1)
				.join("\n"),
		);
	}
	return chunks.join("\n");
}
