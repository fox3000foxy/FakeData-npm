/**
 * Geographic location of a profile.
 *
 * @property street - Street number and name.
 * @property country - Country reference (name, ISO abbreviation, calling code, continent).
 */
export interface Location {
	street: { number: number; name: string };
	city: string;
	state: string;
	country: { name: string; abbreviation: string; phoneCode: string; continent: string };
	continent: string;
}

/**
 * Password of a profile in raw form plus common hashes.
 * The hashes are computed over `raw + salt`.
 */
export interface Passwords {
	raw: string;
	salt: number;
	md5: string;
	sha1: string;
	sha256: string;
}

/**
 * Fake payment-card data with a Luhn-valid number.
 *
 * @property cc - Full card number (alias: `number`).
 * @property expiration_month - 1-12.
 */
export interface CreditCardInfo {
	cc: string;
	number: string;
	cvv: string;
	issuer: string;
	expiration_year: number;
	expiration_month: number;
}

/**
 * Social-media handles keyed by platform (e.g. `twitter`, `instagram`).
 * A `null` value means the profile has no account on that platform.
 */
export type SocialMediaMap = Record<string, string | null>;
/**
 * Ad-preference scores keyed by category name.
 */
export type Preferences = Record<string, number>;

/**
 * Complete fake user profile as returned by `generateFakeProfile`.
 *
 * @property birth - Birth date as a UTC string.
 * @property birthGender - Gender drawn at birth (`Male` or `Female`).
 * @property actualGender - Current gender identity; equals `birthGender` 30% of the time.
 * @property adChoices - Ad preferences as a base64-encoded JSON object.
 */
export interface Profile {
	name: string;
	surname: string;
	birth: string;
	age: number;
	username: string;
	birthGender: string;
	actualGender: string;
	phone_number: string;
	location: Location;
	email: string;
	passwords: Passwords;
	social_media: SocialMediaMap;
	credit_card: CreditCardInfo;
	adChoices: string;
}

/**
 * Pool of gender identities, sexual and romantic orientations
 * used to draw `Profile.actualGender`.
 */
export enum Sexuality {
	Lesbian = "Lesbian",
	Gay = "Gay",
	Bisexual = "Bisexual",
	Transgender = "Transgender",
	Queer = "Queer",
	Intersex = "Intersex",
	Asexual = "Asexual",
	Pansexual = "Pansexual",
	NonBinary = "Non-binary",
	Genderqueer = "Genderqueer",
	Androgyne = "Androgyne",
	Bigenre = "Bigenre",
	Agender = "Agender",
	Genderfluid = "Genderfluid",
	Demisexual = "Demisexual",
	Graysexual = "Graysexual",
	Skoliosexual = "Skoliosexual",
	Homoflexible = "Homoflexible",
	Heteroflexible = "Heteroflexible",
	Queerplatonic = "Queerplatonic",
	Polyamorous = "Polyamorous",
	Monogamous = "Monogamous",
	Pangender = "Pangender",
	Omnisexual = "Omnisexual",
	Questioning = "Questioning",
	TwoSpirit = "Two-Spirit",
	Autosexual = "Autosexual",
	Gynesexual = "Gynesexual",
	Androphilia = "Androphilia",
	Gynephilia = "Gynephilia",
	Sapiosexual = "Sapiosexual",
	Demiromantic = "Demiromantic",
	Heteroromantic = "Heteroromantic",
	Homoromantic = "Homoromantic",
	Biromantic = "Biromantic",
	Panromantic = "Panromantic",
	Polyromantic = "Polyromantic",
	Aroromantic = "Aroromantic",
	Greyromantic = "Greyromantic",
	Lithromantic = "Lithromantic",
	Frayromantic = "Frayromantic",
	Quoiromantic = "Quoiromantic",
	Akoiromantic = "Akoiromantic",
	Cupioromantic = "Cupioromantic",
	Platoniromantic = "Platoniromantic",
	Demisexuality = "Demisexuality",
	Lithsexuality = "Lithsexuality",
	Fraysexuality = "Fraysexuality",
	Apollosexuality = "Apollosexuality",
}
