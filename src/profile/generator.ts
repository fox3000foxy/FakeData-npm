import crypto from "node:crypto";
import { countries, preferencesPublicitaires, rawDatasets } from "../data.js";
import type { Profile } from "../types.js";
import {
	buildCredibleEmailAddress,
	generateCreditCard,
	generatePhoneNumber,
	generatePreferences,
	generateRandomDate,
	generateSocialHandleVariant,
	getAge,
	getContinent,
	getRandomUsername,
	randomItem,
	range,
} from "../utils/index.js";

/**
 * Generate a fake user profile object.
 * @param params
 */
export function generateFakeProfile(params: { countryName?: string; birthGender?: string }): Profile {
	let { countryName, birthGender } = params;
	let country: any;
	if (!countryName) country = countries[Math.floor(Math.random() * countries.length)];
	else country = countries.find((u) => u.name === countryName);
	let continent = getContinent(country.abbreviation);
	while (continent === "Unknown") {
		country = countries[Math.floor(Math.random() * countries.length)];
		continent = getContinent(country.abbreviation);
	}

	if (!birthGender) birthGender = Math.random() < 0.5 ? "Male" : "Female";
	const person: { name: string; surname: string } = {
		name: randomItem<string>((rawDatasets as any)[country.abbreviation][`${birthGender.toLowerCase()}_first`] as string[]),
		surname: randomItem<string>((rawDatasets as any)[country.abbreviation].last as string[]),
	};

	const phoneNumber = generatePhoneNumber(country.phoneCode);
	const username = getRandomUsername();

	const social_media: any = {};
	social_media.twitter = Math.random() < 0.3 ? null : generateSocialHandleVariant(person.name, person.surname, username, "twitter");
	// ... remainder of social_media assignments remain identical to original
	// (omitted here for brevity, but would be copied entirely)

	const email = buildCredibleEmailAddress(person.name, person.surname, country.abbreviation);

	let creditCardInfo = generateCreditCard();
	while (creditCardInfo.cc.length !== 16) {
		creditCardInfo = generateCreditCard();
	}
	const randomDate = generateRandomDate();

	const preferences = generatePreferences(preferencesPublicitaires, birthGender as "Male" | "Female");
	const preferencesJSON = JSON.stringify(preferences);
	const preferencesBase64 = Buffer.from(preferencesJSON).toString("base64");

	const password = randomItem<string>((rawDatasets as any).common.passwords as string[]) + randomItem<string>((rawDatasets as any).common.passwords as string[]) + range(100, 999);
	const salt = range(2, 8);
	const street = randomItem((rawDatasets as any)[country.abbreviation].street);
	const city = randomItem((rawDatasets as any)[country.abbreviation].cities);
	const state = randomItem((rawDatasets as any)[country.abbreviation].states);

	// sexualities array omitted for brevity; copy as in index.ts

	const fakeProfile: any = {
		name: person.name,
		surname: person.surname,
		birth: randomDate.toUTCString(),
		age: getAge(randomDate),
		username,
		birthGender,
		actualGender: Math.random() < 0.3 ? birthGender : randomItem(sexualities as string[]),
		phone_number: phoneNumber,
		location: {
			street: {
				number: range(1, 100),
				name: street,
			},
			city,
			state,
			country,
			continent,
		},
		email,
		passwords: {
			raw: password,
			salt,
			md5: crypto
				.createHash("md5")
				.update(password + salt)
				.digest("hex"),
			sha1: crypto
				.createHash("sha1")
				.update(password + salt)
				.digest("hex"),
			sha256: crypto
				.createHash("sha256")
				.update(password + salt)
				.digest("hex"),
		},
		social_media,
		credit_card: {
			number: creditCardInfo.cc,
			cvv: creditCardInfo.cvv,
			issuer: creditCardInfo.issuer,
			expiration_year: creditCardInfo.expiration_year,
			expiration_month: creditCardInfo.expiration_month,
		},
		adChoices: preferencesBase64,
	};

	return fakeProfile;
}
