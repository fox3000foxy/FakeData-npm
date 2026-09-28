import crypto from "node:crypto";

import { continentsCountries, rawDatasets } from "../data.js";
import type { AdChoiceCategory } from "../data.js";
import type { CreditCardInfo, Preferences } from "../types";

// helper utilities

/** Return a random element from an array. */
export function randomItem<T>(arr: T[]): T {
	if (arr.length === 0) throw new Error("randomItem: empty array");
	return arr[Math.floor(Math.random() * arr.length)] as T;
}

/** Shuffle the elements of an array in place (Fisher–Yates). */
export function shuffleArray<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)) as number;
		const tmp = arr[i] as T;
		arr[i] = arr[j] as T;
		arr[j] = tmp;
	}
	return arr;
}

/** Generate a RFC4122 v4 random UUID string. */
export function randomUUID(): string {
	return crypto.randomUUID();
}

/** Generate a random password of given length composed of letters/numbers. */
export function generatePassword(length: number = 12): string {
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let pwd = "";
	for (let i = 0; i < length; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return pwd;
}

/** Return a random Date between two given dates. */
export function randomDateBetween(start: Date, end: Date): Date {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Build a fake phone number by appending 9 random digits to a country calling code.
 *
 * @param countryCode - Calling code prefix, e.g. "+33".
 * @returns The concatenated fake number.
 */
export function generatePhoneNumber(countryCode: string): string {
	const numeroAleatoire = Math.floor(Math.random() * 1000000000)
		.toString()
		.padStart(9, "0");
	return `${countryCode}${numeroAleatoire}`;
}

/**
 * Derive a plausible social-media handle from a person's names and base pseudo.
 *
 * @param name - First name.
 * @param surname - Last name.
 * @param pseudo - Base username.
 * @param mediaSocial - Target platform (e.g. "twitter", "instagram", "youtube"). Unknown platforms fall back to the lowercased pseudo.
 * @returns The generated handle (a YouTube channel ID for "youtube").
 * @throws Error when any parameter is missing.
 */
export function generateSocialHandleVariant(name: string, surname: string, pseudo: string, mediaSocial: string): string {
	if (!(name && surname && pseudo && mediaSocial)) {
		throw new Error("Missing parameters");
	}

	const pseudoEnMinuscules = pseudo.toLowerCase();
	const surnameEnMinuscules = surname.toLowerCase();
	const numeroRandom = Math.floor(Math.random() * 100);
	const chiffresSuite = generateRandomDigits(5);

	const variations: Record<string, string[]> = {
		instagram: [`${pseudo}_official`, `${pseudo}_real`, `${pseudo}_original`, `${pseudo}_insta`, `${pseudo}_gram`, `${pseudo}_ig`],
		facebook: [
			`${name}.${surname}.${numeroRandom}`,
			`${name}${surname}${numeroRandom}`,
			`${name}-${surname}-${numeroRandom}`,
			`${name}.${surname}${numeroRandom}`,
			`${name}${surname}_${numeroRandom}`,
			`${pseudo}${numeroRandom}`,
		],
		linkedin: [
			`${name}-${surname}-a${chiffresSuite}`,
			`${name}.${surname}.a${chiffresSuite}`,
			`${name}${surname}a${chiffresSuite}`,
			`${name}-${surname}${chiffresSuite}`,
			`${name}.${surname}${chiffresSuite}`,
			`${name}${surname}${chiffresSuite}`,
		],
		twitter: [
			`@${pseudoEnMinuscules}`,
			`@${pseudoEnMinuscules}_official`,
			`@${pseudoEnMinuscules}Official`,
			`@${pseudoEnMinuscules}Real`,
			`@${pseudoEnMinuscules}OfficialAccount`,
			`@${pseudoEnMinuscules}Fan`,
		],
		paypal: [`${pseudoEnMinuscules}@paypal`, `${pseudoEnMinuscules}_paypal`, `paypal_${pseudo}`, `paypal.${pseudoEnMinuscules}`],
		ebay: [`ebay_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_ebay`, `ebay${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_store`, `ebaystore_${pseudoEnMinuscules}`],
		playstation: [`${pseudoEnMinuscules}_PSN`, `${pseudoEnMinuscules}_PlayStation`, `${pseudoEnMinuscules}PS`],
		battlenet: [`${pseudoEnMinuscules}#${Math.floor(9999 * Math.random())}`, `${pseudoEnMinuscules}#${Math.floor(9999 * Math.random())}_${surnameEnMinuscules}`],
		bungiecord: [`${pseudoEnMinuscules}#0000`, `${pseudoEnMinuscules}#0001`, `${pseudoEnMinuscules}#0002`],
		reddit: [`u/${pseudoEnMinuscules}`, `user_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_reddit`, `reddit_${pseudoEnMinuscules}`],
		steam: [`steamcommunity.com/id/${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_steam`, `steam_${pseudoEnMinuscules}`, `steam_${pseudoEnMinuscules}_id`],
		tiktok: [`@${pseudoEnMinuscules}_tiktok`, `tiktok_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_tiktok`],
		xbox: [`xbox_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_xbox`, `${pseudoEnMinuscules}_x`],
		crunchyroll: [`crunchy_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_crunchy`, `crunchy_${pseudoEnMinuscules}_anime`],
		spotify: [`spotify_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_spotify`, `music_${pseudoEnMinuscules}`],
		epicgames: [`epic_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_epic`, `epicgames_${pseudoEnMinuscules}`],
		github: [`${pseudoEnMinuscules}_github`, `${pseudoEnMinuscules}-dev`, `git_${pseudoEnMinuscules}`, `github.com/${pseudoEnMinuscules}`],
		riotgames: [`${pseudoEnMinuscules}_riot`, `${pseudoEnMinuscules}_games`, `riot_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_gg`],
		leagueoflegends: [`${pseudoEnMinuscules}_lol`, `${pseudoEnMinuscules}_league`, `${pseudoEnMinuscules}_legends`],
		twitch: [`${pseudoEnMinuscules}_stream`, `${pseudoEnMinuscules}TV`, `${pseudoEnMinuscules}_twitch`, `twitch_${pseudoEnMinuscules}`],
		youtube: [`${pseudoEnMinuscules}_YT`, `youtube.com/user/${pseudoEnMinuscules}`, `yt_${pseudoEnMinuscules}`, `${pseudoEnMinuscules}_tube`],
		onlyfans: [`${pseudoEnMinuscules}_fans`, `${pseudoEnMinuscules}_exclusive`, `${pseudoEnMinuscules}_content`, `only_${pseudoEnMinuscules}`],
	};

	let pseudoVariante = pseudoEnMinuscules;
	const pickVariant = (key: string): string => {
		const list = variations[key];
		if (!list) throw new Error(`Unknown social media "${key}"`);
		return randomItem(list);
	};
	switch (mediaSocial.toLowerCase()) {
		case "twitter":
			pseudoVariante = pickVariant("twitter");
			break;
		case "instagram":
			pseudoVariante = Math.random() < 0.5 ? pickVariant("instagram") : pseudoEnMinuscules;
			break;
		case "facebook":
			pseudoVariante = pickVariant("facebook");
			break;
		case "linkedin":
			pseudoVariante = pickVariant("linkedin");
			break;
		case "paypal":
			pseudoVariante = pickVariant("paypal");
			break;
		case "ebay":
			pseudoVariante = pickVariant("ebay");
			break;
		case "playstation":
			pseudoVariante = pickVariant("playstation");
			break;
		case "battlenet":
			pseudoVariante = pickVariant("battlenet");
			break;
		case "bungiecord":
			pseudoVariante = pickVariant("bungiecord");
			break;
		case "reddit":
			pseudoVariante = pickVariant("reddit");
			break;
		case "steam":
			pseudoVariante = pickVariant("steam");
			break;
		case "tiktok":
			pseudoVariante = pickVariant("tiktok");
			break;
		case "xbox":
			pseudoVariante = pickVariant("xbox");
			break;
		case "crunchyroll":
			pseudoVariante = pickVariant("crunchyroll");
			break;
		case "spotify":
			pseudoVariante = pickVariant("spotify");
			break;
		case "epicgames":
			pseudoVariante = pickVariant("epicgames");
			break;
		case "github":
			pseudoVariante = pickVariant("github");
			break;
		case "riotgames":
			pseudoVariante = pickVariant("riotgames");
			break;
		case "leagueoflegends":
			pseudoVariante = pickVariant("leagueoflegends");
			break;
		case "onlyfans":
			pseudoVariante = pickVariant("onlyfans");
			break;
		case "twitch":
			pseudoVariante = pickVariant("twitch");
			break;
		case "youtube":
			pseudoVariante = generateYouTubeChannelID();
			break;
		default:
			pseudoVariante = pseudoEnMinuscules;
			break;
	}

	return pseudoVariante;
}

/**
 * Generate a string of random digits of the given length.
 * @param {number} length
 * @returns {string}
 */
export function generateRandomDigits(length: number): string {
	let chiffres = "";
	for (let i = 0; i < length; i++) {
		chiffres += Math.floor(Math.random() * 10);
	}
	return chiffres;
}

/**
 * Construct a believable email address using first and last name and a
 * random domain for the specified country code.
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} countryCode
 * @returns {string}
 */
export function buildCredibleEmailAddress(firstName: string, lastName: string, countryCode: string): string {
	const domaines: Record<string, string[]> = rawDatasets.mailboxes;

	if (firstName && lastName) {
		const firstLower = firstName.toLowerCase();
		const lastLower = lastName.toLowerCase();

		const candidates = domaines[countryCode] ?? Object.values(domaines).flat();
		const domaineAleatoire = randomItem(candidates);
		const choixVariante = Math.floor(Math.random() * 10);

		let adresseEmail = "";

		switch (choixVariante) {
			case 0:
				adresseEmail = `${firstLower}.${lastLower}@${domaineAleatoire}`;
				break;
			case 1:
				adresseEmail = `${firstLower}${lastLower}@${domaineAleatoire}`;
				break;
			case 2:
				adresseEmail = `${lastLower}.${firstLower}@${domaineAleatoire}`;
				break;
			case 3:
				adresseEmail = `${lastLower}${firstLower}@${domaineAleatoire}`;
				break;
			case 4:
			case 5:
				adresseEmail = `${firstLower.charAt(0)}${lastLower}@${domaineAleatoire}`;
				break;
			case 6:
			case 7:
				adresseEmail = `${firstLower}_${lastLower}@${domaineAleatoire}`;
				break;
			case 8:
				adresseEmail = `${firstLower}.${lastLower}${generateRandomDigits(3)}@${domaineAleatoire}`;
				break;
			case 9:
				adresseEmail = `${lastLower}${firstLower}${generateRandomDigits(3)}@${domaineAleatoire}`;
				break;
		}

		return adresseEmail;
	} else {
		throw new Error("Missing first name or last name");
	}
}

/**
 * Generate fake Luhn-valid credit-card data (Visa, Mastercard, American Express or Discover).
 * American Express numbers have 15 digits and a 4-digit CVV, other issuers 16 digits and a 3-digit CVV.
 *
 * @returns Card data with `cc`/`number`, `cvv`, `issuer` and expiration fields.
 */
export function generateCreditCard(): CreditCardInfo {
	const cardNumber: number[] = [];

	const issuers = ["Mastercard", "Visa", "American Express", "Discover"] as const;
	const issuer = randomItem([...issuers]);

	const expiryYear = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;

	switch (issuer) {
		case "Visa":
			cardNumber.push(4);
			break;
		case "Mastercard":
			cardNumber.push(5);
			cardNumber.push(1 + Math.floor(Math.random() * 5));
			break;
		case "American Express":
			cardNumber.push(3);
			cardNumber.push(4 + Math.floor(Math.random() * 4));
			break;
		case "Discover":
			cardNumber.push(6);
			cardNumber.push(0);
			cardNumber.push(1);
			cardNumber.push(1);
			break;
	}

	const cardLength = issuer === "American Express" ? 15 : 16;
	for (let i = cardNumber.length; i < cardLength - 1; i++) {
		cardNumber.push(Math.floor(Math.random() * 10));
	}

	// Luhn check digit: pick the digit making the full number valid.
	const partial = cardNumber.join("");
	let checksumDigit = 0;
	for (let d = 0; d <= 9; d++) {
		const candidate = partial + String(d);
		let sum = 0;
		for (let i = 0; i < candidate.length; i++) {
			let digit = Number(candidate[i]);
			if ((candidate.length - i) % 2 === 0) {
				digit *= 2;
				if (digit > 9) digit -= 9;
			}
			sum += digit;
		}
		if (sum % 10 === 0) {
			checksumDigit = d;
			break;
		}
	}
	cardNumber.push(checksumDigit);

	const cardNumberStr = cardNumber.join("");

	const cvv = generateRandomDigits(issuer === "American Express" ? 4 : 3);

	const expiryMonth = Math.floor(Math.random() * 12) + 1;

	return {
		cc: cardNumberStr,
		cvv,
		issuer,
		expiration_year: expiryYear,
		expiration_month: expiryMonth,
		number: cardNumberStr,
	};
}

/**
 * Draw a username from the dataset pool without replacement until exhausted, then refill the pool.
 *
 * @returns A username string.
 */
export function getRandomUsername(): string {
	if (usernames.length === 0) usernames = [...usernamesTemplate];
	const usernameIndex = Math.floor(Math.random() * usernames.length);
	return usernames.splice(usernameIndex, 1)[0] as string;
}

const usernamesTemplate: string[] = rawDatasets.usernames;
let usernames: string[] = [...usernamesTemplate];

/**
 * Generate a random adult birth date between 19 and 80 years ago.
 *
 * @returns A date between the two bounds.
 */
export function generateRandomDate(): Date {
	const now = new Date();
	const youngest = new Date(now);
	youngest.setFullYear(youngest.getFullYear() - 19);
	const oldest = new Date(now);
	oldest.setFullYear(oldest.getFullYear() - 80);
	return randomDateBetween(oldest, youngest);
}

/**
 * Compute full years of age for a birth date.
 *
 * @param birthDate - Birth date.
 * @returns Age in full years.
 */
export function getAge(birthDate: Date): number {
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

// continent lookup helper relies on data module

/**
 * Resolve a continent name from an ISO country code.
 *
 * @param countryCode - ISO country code, e.g. "US".
 * @returns The continent name, or "Unknown" when unmapped.
 */
export function getContinent(countryCode: string): string {
	for (const continent in continentsCountries) {
		if (continentsCountries[continent]?.includes(countryCode)) {
			return continent;
		}
	}
	return "Unknown";
}

/**
 * Score ad-choice categories for a gender and return the top 15-20 as a preference map.
 * Pure: scores are computed on a copy, the input array is never mutated.
 *
 * @param categories - Ad-choice categories with base scores per gender.
 * @param gender - Gender used for scoring.
 * @returns Preference map of category name to score.
 * @throws Error when a category entry is empty.
 */
export function generatePreferences(categories: AdChoiceCategory[], gender: "Male" | "Female"): Preferences {
	// Work on a copy: the previous version mutated the caller's array
	// (score *= coef + in-place sort), making repeated calls non-idempotent.
	const scored = categories.map((categorie) => {
		const name = Object.keys(categorie)[0] as string;
		const entry = categorie[name];
		if (!entry) throw new Error("Empty ad-choice category");
		const coef = Math.random() * 1 + 0.5;
		return { name, score: entry[gender] * coef };
	});

	scored.sort((a, b) => b.score - a.score);
	const selected = scored.slice(0, Math.floor(Math.random() * 6) + 15);

	const preferences: Preferences = {};
	for (const { name, score } of selected) {
		preferences[name] = score;
	}
	return preferences;
}

/**
 * Generate a random YouTube channel ID ("UC" followed by 22 characters).
 *
 * @returns The channel ID string.
 */
export function generateYouTubeChannelID(): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	const length = 22;
	let channelID = "UC";
	for (let i = 0; i < length; i++) {
		channelID += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return channelID;
}

/**
 * Return a random integer in the half-open interval [min, max).
 *
 * @param min - Inclusive lower bound.
 * @param max - Exclusive upper bound.
 * @returns A random integer.
 */
export function range(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}
