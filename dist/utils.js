import crypto from 'crypto';
import fs from 'fs';
import { rawDatasets } from './data';
// helper utilities
/** Return a random element from an array. */
export function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
/** Shuffle the elements of an array in place (Fisher–Yates). */
export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
/** Generate a RFC4122 v4 random UUID string. */
export function randomUUID() {
    return crypto.randomUUID();
}
/** Generate a random password of given length composed of letters/numbers. */
export function generatePassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pwd = '';
    for (let i = 0; i < length; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
}
/** Return a random Date between two given dates. */
export function randomDateBetween(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export function generatePhoneNumber(countryCode) {
    const numeroAleatoire = Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, '0');
    return `${countryCode}${numeroAleatoire}`;
}
export function generateSocialHandleVariant(name, surname, pseudo, mediaSocial) {
    if (!(name && surname && pseudo && mediaSocial)) {
        throw new Error('Missing parameters');
    }
    const pseudoEnMinuscules = pseudo.toLowerCase();
    const nameEnMinuscules = name.toLowerCase();
    const surnameEnMinuscules = surname.toLowerCase();
    const numeroRandom = Math.floor(Math.random() * 100);
    const chiffresSuite = generateRandomDigits(5);
    const variations = {
        instagram: [
            `${pseudo}_official`,
            `${pseudo}_real`,
            `${pseudo}_original`,
            `${pseudo}_insta`,
            `${pseudo}_gram`,
            `${pseudo}_ig`,
        ],
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
        paypal: [
            `${pseudoEnMinuscules}@paypal`,
            `${pseudoEnMinuscules}_paypal`,
            `paypal_${pseudo}`,
            `paypal.${pseudoEnMinuscules}`,
        ],
        ebay: [
            `ebay_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_ebay`,
            `ebay${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_store`,
            `ebaystore_${pseudoEnMinuscules}`,
        ],
        playstation: [
            `${pseudoEnMinuscules}_PSN`,
            `${pseudoEnMinuscules}_PlayStation`,
            `${pseudoEnMinuscules}PS`,
        ],
        battlenet: [
            `${pseudoEnMinuscules}#${Math.floor(9999 * Math.random())}`,
            `${pseudoEnMinuscules}#${Math.floor(9999 * Math.random())}_${surnameEnMinuscules}`,
        ],
        bungiecord: [
            `${pseudoEnMinuscules}#0000`,
            `${pseudoEnMinuscules}#0001`,
            `${pseudoEnMinuscules}#0002`,
        ],
        reddit: [
            `u/${pseudoEnMinuscules}`,
            `user_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_reddit`,
            `reddit_${pseudoEnMinuscules}`,
        ],
        steam: [
            `steamcommunity.com/id/${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_steam`,
            `steam_${pseudoEnMinuscules}`,
            `steam_${pseudoEnMinuscules}_id`,
        ],
        tiktok: [
            `@${pseudoEnMinuscules}_tiktok`,
            `tiktok_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_tiktok`,
        ],
        xbox: [
            `xbox_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_xbox`,
            `${pseudoEnMinuscules}_x`,
        ],
        crunchyroll: [
            `crunchy_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_crunchy`,
            `crunchy_${pseudoEnMinuscules}_anime`,
        ],
        spotify: [
            `spotify_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_spotify`,
            `music_${pseudoEnMinuscules}`,
        ],
        epicgames: [
            `epic_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_epic`,
            `epicgames_${pseudoEnMinuscules}`,
        ],
        github: [
            `${pseudoEnMinuscules}_github`,
            `${pseudoEnMinuscules}-dev`,
            `git_${pseudoEnMinuscules}`,
            `github.com/${pseudoEnMinuscules}`,
        ],
        riotgames: [
            `${pseudoEnMinuscules}_riot`,
            `${pseudoEnMinuscules}_games`,
            `riot_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_gg`,
        ],
        leagueoflegends: [
            `${pseudoEnMinuscules}_lol`,
            `${pseudoEnMinuscules}_league`,
            `${pseudoEnMinuscules}_legends`,
        ],
        twitch: [
            `${pseudoEnMinuscules}_stream`,
            `${pseudoEnMinuscules}TV`,
            `${pseudoEnMinuscules}_twitch`,
            `twitch_${pseudoEnMinuscules}`,
        ],
        youtube: [
            `${pseudoEnMinuscules}_YT`,
            `youtube.com/user/${pseudoEnMinuscules}`,
            `yt_${pseudoEnMinuscules}`,
            `${pseudoEnMinuscules}_tube`,
        ],
        onlyfans: [
            `${pseudoEnMinuscules}_fans`,
            `${pseudoEnMinuscules}_exclusive`,
            `${pseudoEnMinuscules}_content`,
            `only_${pseudoEnMinuscules}`,
        ],
    };
    let pseudoVariante = pseudoEnMinuscules;
    switch (mediaSocial.toLowerCase()) {
        case 'twitter':
            pseudoVariante = `@${pseudoEnMinuscules}`;
            break;
        case 'instagram':
            pseudoVariante =
                Math.random() < 0.5
                    ? randomItem(variations['instagram'])
                    : pseudoEnMinuscules;
            break;
        case 'facebook':
            pseudoVariante = randomItem(variations['facebook']);
            break;
        case 'linkedin':
            pseudoVariante = randomItem(variations['linkedin']);
            break;
        case 'paypal':
            pseudoVariante = randomItem(variations['paypal']);
            break;
        case 'ebay':
            pseudoVariante = randomItem(variations['ebay']);
            break;
        case 'playstation':
            pseudoVariante = randomItem(variations['playstation']);
            break;
        case 'battlenet':
            pseudoVariante = randomItem(variations['battlenet']);
            break;
        case 'bungiecord':
            pseudoVariante = randomItem(variations['bungiecord']);
            break;
        case 'reddit':
            pseudoVariante = randomItem(variations['reddit']);
            break;
        case 'steam':
            pseudoVariante = randomItem(variations['steam']);
            break;
        case 'tiktok':
            pseudoVariante = randomItem(variations['tiktok']);
            break;
        case 'xbox':
            pseudoVariante = randomItem(variations['xbox']);
            break;
        case 'crunchyroll':
            pseudoVariante = randomItem(variations['crunchyroll']);
            break;
        case 'spotify':
            pseudoVariante = randomItem(variations['spotify']);
            break;
        case 'epicgames':
            pseudoVariante = randomItem(variations['epicgames']);
            break;
        case 'github':
            pseudoVariante = randomItem(variations['github']);
            break;
        case 'riotgames':
            pseudoVariante = randomItem(variations['riotgames']);
            break;
        case 'onlyfans':
            pseudoVariante = randomItem(variations['onlyfans']);
            break;
        case 'twitch':
            pseudoVariante = randomItem(variations['twitch']);
            break;
        case 'youtube':
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
export function generateRandomDigits(length) {
    let chiffres = '';
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
export function buildCredibleEmailAddress(firstName, lastName, countryCode) {
    const domaines = rawDatasets.mailboxes;
    if (firstName && lastName) {
        const firstLower = firstName.toLowerCase();
        const lastLower = lastName.toLowerCase();
        const domaineAleatoire = randomItem(domaines[countryCode]);
        const choixVariante = Math.floor(Math.random() * 10);
        let adresseEmail = '';
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
    }
    else {
        throw new Error('Missing first name or last name');
    }
}
export function generateCreditCard() {
    const cardNumber = [];
    let checksum = 0;
    let issuer;
    let expiryMonth;
    let expiryYear;
    let cvv;
    const issuers = ['Mastercard', 'Visa', 'American Express', 'Discover'];
    const randomIssuerIndex = Math.floor(Math.random() * issuers.length);
    issuer = issuers[randomIssuerIndex];
    let firstDigits = (Math.floor(Math.random() * 9) + 1) +
        '' +
        (Math.floor(Math.random() * 10)) +
        '' +
        (Math.floor(Math.random() * 10));
    expiryYear = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
    switch (issuer) {
        case 'Visa':
            cardNumber.push(4);
            break;
        case 'Mastercard':
            cardNumber.push(5);
            cardNumber.push(1 + Math.floor(Math.random() * 5));
            break;
        case 'American Express':
            cardNumber.push(3);
            cardNumber.push(4 + Math.floor(Math.random() * 4));
            firstDigits += Math.floor(Math.random() * 10);
            break;
        case 'Discover':
            cardNumber.push(6);
            cardNumber.push(0);
            cardNumber.push(1);
            cardNumber.push(1);
            break;
    }
    const cardLength = issuer === 'American Express' ? 15 : 16;
    for (let i = cardNumber.length; i < cardLength - 1; i++) {
        cardNumber.push(Math.floor(Math.random() * 10));
    }
    for (let i = 0; i < cardLength - 1; i++) {
        let digit = cardNumber[i];
        if ((i + 1) % 2 === cardLength % 2) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        checksum += digit;
    }
    const checksumDigit = (10 - (checksum % 10)) % 10;
    cardNumber.push(checksumDigit);
    const cardNumberStr = cardNumber.join('');
    cvv =
        Math.floor(Math.random() * 9) +
            '' +
            Math.floor(Math.random() * 9) +
            '' +
            Math.floor(Math.random() * 9);
    expiryMonth = Math.floor(Math.random() * 12) + 1;
    return {
        cc: cardNumberStr,
        cvv,
        issuer,
        expiration_year: expiryYear,
        expiration_month: expiryMonth,
        number: cardNumberStr,
    };
}
export function getRandomUsername() {
    if (usernames.length === 0)
        usernames = [...usernamesTemplate];
    const usernameIndex = Math.floor(Math.random() * usernames.length);
    const username = usernames[usernameIndex];
    return username;
}
const usernamesTemplate = rawDatasets.usernames;
let usernames = [...usernamesTemplate];
export function generateRandomDate() {
    const dateActuelle = new Date();
    const dateIlYa13Ans = new Date(dateActuelle);
    dateIlYa13Ans.setFullYear(dateIlYa13Ans.getFullYear() - 19);
    const dateIlYa30Ans = new Date(dateActuelle);
    dateIlYa30Ans.setFullYear(dateIlYa30Ans.getFullYear() - 80);
    const dateAleatoire = new Date(dateIlYa13Ans.getTime() +
        Math.random() * (dateIlYa30Ans.getTime() - dateIlYa13Ans.getTime()));
    return dateAleatoire;
}
export function getAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
// continent lookup helper relies on data module
import { continentsCountries } from './data';
export function getContinent(countryCode) {
    for (const continent in continentsCountries) {
        if (continentsCountries[continent].includes(countryCode)) {
            return continent;
        }
    }
    return 'Unknown';
}
export function generatePreferences(categories, gender) {
    categories.forEach((categorie) => {
        const categorieName = Object.keys(categorie)[0];
        const coef = Math.random() * 1 + 0.5;
        categorie[categorieName][gender] *= coef;
    });
    categories.sort((a, b) => b[Object.keys(b)[0]][gender] - a[Object.keys(a)[0]][gender]);
    const categoriesSelectionnees = categories.slice(0, Math.floor(Math.random() * 6) + 15);
    const preferences = {};
    categoriesSelectionnees.forEach((categorie) => {
        const categorieName = Object.keys(categorie)[0];
        const score = categorie[categorieName][gender];
        preferences[categorieName] = score;
    });
    return preferences;
}
export function generateYouTubeChannelID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const length = 22;
    let channelID = 'UC';
    for (let i = 0; i < length; i++) {
        channelID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return channelID;
}
export function range(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
export function composeCSVFile(data) {
    const header = 'name;surname;birth;age;location_street_number;location_street_name;location_city;location_state;location_country_name;location_country_abbreviation;location_country_phoneCode;location_continent;username;birthGender;actualGender;phone_number;social_media_twitter;social_media_instagram;social_media_facebook;social_media_linkedin;social_media_youtube;social_media_twitch;email;credit_card_number;credit_card_cvv;credit_card_issuer;credit_card_expiration_month;credit_card_expiration_year;passwords_raw;passwords_salt;passwords_md5;passwords_sha1;passwords_sha256;adChoices\n';
    const rows = data
        .map((profile) => {
        const formattedProfile = [
            profile.name,
            profile.surname,
            profile.birth.split(',').join(' '),
            profile.age,
            profile.location.street.number,
            profile.location.street.name,
            profile.location.city,
            profile.location.state,
            profile.location.country.name,
            profile.location.country.abbreviation,
            profile.location.country.phoneCode,
            profile.location.country.continent,
            profile.username,
            profile.birthGender,
            profile.actualGender,
            profile.phone_number,
            [
                profile.social_media.twitter,
                profile.social_media.instagram,
                profile.social_media.facebook,
                profile.social_media.linkedin,
                profile.social_media.youtube,
                profile.social_media.twitch,
            ].join(';'),
            profile.email,
            [
                profile.credit_card.number,
                profile.credit_card.cvv,
                profile.credit_card.issuer,
                profile.credit_card.expiration_month,
                profile.credit_card.expiration_year,
            ].join(';'),
            profile.passwords.raw,
            profile.passwords.salt,
            profile.passwords.md5,
            profile.passwords.sha1,
            profile.passwords.sha256,
            profile.adChoices,
        ];
        return formattedProfile.join(';');
    })
        .join('\n');
    return header + rows;
}
export function writeCSVFile(filename, content) {
    fs.writeFileSync(filename, content);
}
