import type { Profile } from "../types.js";
import { composeCSVFile } from "../utils/csv.js";
import { generateFakeProfile } from "./generator.js";

export function generateFakeProfilesBatch(batchSize: number, params: { countryName?: string; birthGender?: string }): Profile[] {
	const profiles: Profile[] = [];
	for (let i = 0; i < batchSize; i++) {
		profiles.push(generateFakeProfile(params));
	}
	return profiles;
}

export function generateAndComposeCSV(totalProfiles: number, batchSize: number, params: { countryName?: string; birthGender?: string }): string {
	const profiles: Profile[] = [];
	for (let i = 0; i < totalProfiles / batchSize; i++) {
		console.log("Generated", i * batchSize);
		const batch = generateFakeProfilesBatch(batchSize, params);
		profiles.push(...batch);
	}
	return composeCSVFile(profiles);
}
