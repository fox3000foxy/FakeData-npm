import type { Profile } from "../types.js";
import { composeCSVFile } from "../utils/csv.js";
import { generateFakeProfile } from "./generator.js";

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
		chunks.push(composeCSVFile(batch).split("\n").slice(chunks.length === 0 ? 0 : 1).join("\n"));
	}
	if (remainder > 0) {
		const batch = generateFakeProfilesBatch(remainder, params);
		generated += batch.length;
		onProgress?.(generated, totalProfiles);
		chunks.push(composeCSVFile(batch).split("\n").slice(chunks.length === 0 ? 0 : 1).join("\n"));
	}
	return chunks.join("\n");
}
