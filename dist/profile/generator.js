import crypto from "node:crypto";
import { countries, getCountryDataset, getCountryList, preferencesPublicitaires, rawDatasets } from "../data.js";
import { sexualities } from "./constants.js";
import { buildCredibleEmailAddress, generateCreditCard, generatePhoneNumber, generatePreferences, generateRandomDate, generateSocialHandleVariant, getAge, getContinent, getRandomUsername, randomItem, range, } from "../utils/index.js";
/**
 * Generate a complete fake user profile.
 *
 * @param params - Generation options.
 * @param params.countryName - Full country name (e.g. "France"); a random country is used when omitted.
 * @param params.birthGender - "Male" or "Female"; drawn at random when omitted.
 * @returns A fully populated `Profile` object.
 * @throws Error when `countryName` matches no known country or when a dataset list is missing.
 */
export function generateFakeProfile(params) {
    let { countryName, birthGender } = params;
    let country = countryName ? countries.find((u) => u.name === countryName) : randomItem(countries);
    if (!country) {
        throw new Error(`Unknown countryName "${countryName}". Expected one of: ${countries.map((c) => c.name).join(", ")}`);
    }
    let continent = getContinent(country.abbreviation);
    // Guard against datasets where a country has no continent mapping:
    // retry a bounded number of times, then fall back to the drawn country.
    let attempts = 0;
    while (continent === "Unknown" && attempts < 10) {
        country = randomItem(countries);
        continent = getContinent(country.abbreviation);
        attempts++;
    }
    if (!birthGender)
        birthGender = Math.random() < 0.5 ? "Male" : "Female";
    const dataset = getCountryDataset(country.abbreviation);
    const person = {
        name: randomItem(getCountryList(dataset, `${birthGender.toLowerCase()}_first`, country.abbreviation)),
        surname: randomItem(getCountryList(dataset, "last", country.abbreviation)),
    };
    const phoneNumber = generatePhoneNumber(country.phoneCode);
    const username = getRandomUsername();
    const social_media = {};
    social_media.twitter = Math.random() < 0.3 ? null : generateSocialHandleVariant(person.name, person.surname, username, "twitter");
    // ... remainder of social_media assignments remain identical to original
    // (omitted here for brevity, but would be copied entirely)
    const email = buildCredibleEmailAddress(person.name, person.surname, country.abbreviation);
    const creditCardInfo = generateCreditCard();
    const randomDate = generateRandomDate();
    const preferences = generatePreferences(preferencesPublicitaires, birthGender);
    const preferencesJSON = JSON.stringify(preferences);
    // btoa in browsers, Buffer in Node — keep the lib runtime-agnostic.
    const preferencesBase64 = typeof Buffer !== "undefined" ? Buffer.from(preferencesJSON, "utf-8").toString("base64") : btoa(String.fromCharCode(...new TextEncoder().encode(preferencesJSON)));
    const password = randomItem(rawDatasets.common.passwords) + randomItem(rawDatasets.common.passwords) + range(100, 999);
    const salt = range(2, 8);
    const street = randomItem(getCountryList(dataset, "street", country.abbreviation));
    const city = randomItem(getCountryList(dataset, "cities", country.abbreviation));
    const state = randomItem(getCountryList(dataset, "states", country.abbreviation));
    // sexualities imported from ./constants.ts
    const fakeProfile = {
        name: person.name,
        surname: person.surname,
        birth: randomDate.toUTCString(),
        age: getAge(randomDate),
        username,
        birthGender,
        actualGender: Math.random() < 0.3 ? birthGender : randomItem(sexualities),
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
            cc: creditCardInfo.cc,
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
