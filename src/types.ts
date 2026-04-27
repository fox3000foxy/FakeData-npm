export interface Location {
	street: { number: number; name: string };
	city: string;
	state: string;
	country: { name: string; abbreviation: string; phoneCode: string; continent: string };
	continent: string;
}

export interface Passwords {
	raw: string;
	salt: number;
	md5: string;
	sha1: string;
	sha256: string;
}

export interface CreditCardInfo {
	cc: string;
	number: string;
	cvv: string;
	issuer: string;
	expiration_year: number;
	expiration_month: number;
}

export type SocialMediaMap = Record<string, string | null>;
export type Preferences = Record<string, number>;

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
	Queerplatonic2 = "Queerplatonic",
}
