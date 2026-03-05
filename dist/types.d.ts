export interface Location {
    street: {
        number: number;
        name: string;
    };
    city: string;
    state: string;
    country: {
        name: string;
        abbreviation: string;
        phoneCode: string;
        continent: string;
    };
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
//# sourceMappingURL=types.d.ts.map