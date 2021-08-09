/**
 * {
 *   countryIso: {
 *     variableName: {
 *       column: value
 *     }
 *   }
 * }
 */
export type DataExportResults = Record<string, Record<string, Record<string, string>>>
