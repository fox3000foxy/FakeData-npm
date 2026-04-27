import fs from "node:fs";
import type { Profile } from "../types";

/**
 * Compose a CSV string from an array of profiles.  Uses semicolon delimiter.
 */
export function composeCSVFile(data: Profile[]): string {
	const header =
		"name;surname;birth;age;location_street_number;location_street_name;location_city;location_state;location_country_name;location_country_abbreviation;location_country_phoneCode;location_continent;username;birthGender;actualGender;phone_number;social_media_twitter;social_media_instagram;social_media_facebook;social_media_linkedin;social_media_youtube;social_media_twitch;email;credit_card_number;credit_card_cvv;credit_card_issuer;credit_card_expiration_month;credit_card_expiration_year;passwords_raw;passwords_salt;passwords_md5;passwords_sha1;passwords_sha256;adChoices\n";

	const rows = data
		.map((profile) => {
			const formattedProfile = [
				profile.name,
				profile.surname,
				profile.birth.split(",").join(" "),
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
				[profile.social_media.twitter, profile.social_media.instagram, profile.social_media.facebook, profile.social_media.linkedin, profile.social_media.youtube, profile.social_media.twitch].join(
					";",
				),
				profile.email,
				[profile.credit_card.number, profile.credit_card.cvv, profile.credit_card.issuer, profile.credit_card.expiration_month, profile.credit_card.expiration_year].join(";"),
				profile.passwords.raw,
				profile.passwords.salt,
				profile.passwords.md5,
				profile.passwords.sha1,
				profile.passwords.sha256,
				profile.adChoices,
			];
			return formattedProfile.join(";");
		})
		.join("\n");

	return header + rows;
}

/**
 * Write given string to disk (UTF-8).
 */
export function writeCSVFile(filename: string, content: string): void {
	fs.writeFileSync(filename, content);
}
