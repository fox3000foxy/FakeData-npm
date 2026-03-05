import type { Profile } from '../types';
/**
 * Compose a CSV string from an array of profiles.  Uses semicolon delimiter.
 */
export declare function composeCSVFile(data: Profile[]): string;
/**
 * Write given string to disk (UTF-8).
 */
export declare function writeCSVFile(filename: string, content: string): void;
//# sourceMappingURL=csv.d.ts.map