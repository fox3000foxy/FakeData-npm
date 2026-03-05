import { composeCSVFile } from '../utils/csv';
import { generateFakeProfile } from './generator';
export function generateFakeProfilesBatch(batchSize, params) {
    const profiles = [];
    for (let i = 0; i < batchSize; i++) {
        profiles.push(generateFakeProfile(params));
    }
    return profiles;
}
export function generateAndComposeCSV(totalProfiles, batchSize, params) {
    const profiles = [];
    for (let i = 0; i < totalProfiles / batchSize; i++) {
        console.log('Generated', i * batchSize);
        const batch = generateFakeProfilesBatch(batchSize, params);
        profiles.push(...batch);
    }
    return composeCSVFile(profiles);
}
