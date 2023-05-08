import { Country, CountryIso } from '@meta/area'

type Countries = {
  [key in CountryIso]?: Country
}

// TODO: Specify this as
/*
 * {
 *   appIniitalized:
 *   [key = assessmentName]: Assessment & { [cycleName]: countries, regionGroups, sections }
 *
 *
 * */
export type AssessmentState = any /* {
  assessment?: Assessment
  countries?: Countries
  regionGroups?: Record<string, RegionGroup>
  sections?: Array<Section>

  appInitialized: boolean
}
*/
