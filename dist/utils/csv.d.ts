import type { Profile } from "../types";
/**
 * Compose a CSV string from an array of profiles. Uses semicolon delimiter.
 * Each field occupies exactly one column; values containing the delimiter,
 * quotes or newlines are RFC-4180 quoted.
 *
 * @param data - Profiles to serialize.
 * @returns CSV string starting with a single header row.
 */
export declare function composeCSVFile(data: Profile[]): string;
/**
 * Write a string to disk (UTF-8).
 *
 * @param filename - Destination file path.
 * @param content - Text content to write.
 */
export declare function writeCSVFile(filename: string, content: string): void;
//# sourceMappingURL=csv.d.ts.map