import {
    generateFakeProfile,
    generatePassword,
    randomDateBetween,
    randomItem,
    randomUUID,
    shuffleArray,
} from '../index';

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
});