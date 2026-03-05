import fs from 'fs';
import path from 'path';
import {
    composeCSVFile,
    generateCreditCard,
    generateFakeProfile,
    generateFakeProfilesBatch,
    generatePassword,
    generatePreferences,
    getContinent,
    randomDateBetween,
    randomItem,
    randomUUID,
    shuffleArray,
    writeCSVFile,
} from '../src/index';

describe('utility helpers', () => {
    test('randomItem picks element from array', () => {
        const arr = [1, 2, 3];
        expect(arr).toContain(randomItem(arr));
    });

    test('shuffleArray returns permutation', () => {
        const arr = [1, 2, 3, 4, 5];
        const copy = [...arr];
        const shuffled = shuffleArray(arr);
        expect(shuffled.sort()).toEqual(copy.sort());
        // there is a small chance it remains identical but that's okay
    });

    test('randomUUID returns string of correct format', () => {
        const uuid = randomUUID();
        expect(uuid).toMatch(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/);
    });

    test('generatePassword produces given length', () => {
        const pwd = generatePassword(16);
        expect(pwd).toHaveLength(16);
        expect(/^[A-Za-z0-9]+$/.test(pwd)).toBe(true);
    });

    test('randomDateBetween gives date in range', () => {
        const start = new Date(2000, 0, 1);
        const end = new Date(2000, 11, 31);
        const d = randomDateBetween(start, end);
        expect(d.getTime()).toBeGreaterThanOrEqual(start.getTime());
        expect(d.getTime()).toBeLessThanOrEqual(end.getTime());
    });

    test('generateFakeProfile returns object with expected keys', () => {
        const profile = generateFakeProfile({});
        expect(profile).toHaveProperty('name');
        expect(profile).toHaveProperty('email');
        expect(typeof profile.age).toBe('number');
    });

    test('generateFakeProfilesBatch returns correct length', () => {
        const batch = generateFakeProfilesBatch(5, {} as any);
        expect(batch).toHaveLength(5);
        batch.forEach((p) => expect(p).toHaveProperty('username'));
    });

    test('composeCSVFile produces header and rows', () => {
        const batch = generateFakeProfilesBatch(2, {} as any);
        const csv = composeCSVFile(batch as any);
        const lines = csv.split('\n');
        expect(lines[0]).toContain('name;surname;birth');
        expect(lines.length).toBeGreaterThanOrEqual(3);
    });

    test('generateCreditCard returns valid-looking number', () => {
        const card = generateCreditCard();
        expect(card.number).toMatch(/^\d{15,16}$/);
        expect(card.cvv).toMatch(/^\d{3}$/);
    });

    test('getContinent returns string for known code', () => {
        const cont = getContinent('US');
        expect(typeof cont).toBe('string');
        expect(cont).not.toBe('Unknown');
    });

    test('generatePreferences returns map with numeric values', () => {
        const prefs = generatePreferences([{foo:{Male:1,Female:1}}], 'Male');
        expect(prefs).toHaveProperty('foo');
        expect(typeof prefs.foo).toBe('number');
    });

    test('writeCSVFile creates a file', () => {
        const tmp = path.join(__dirname, 'tmp.csv');
        writeCSVFile(tmp, 'a,b,c');
        expect(fs.existsSync(tmp)).toBe(true);
        const content = fs.readFileSync(tmp, 'utf-8');
        expect(content).toBe('a,b,c');
        fs.unlinkSync(tmp);
    });
});