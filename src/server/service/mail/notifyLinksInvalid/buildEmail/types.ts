import { TFunction } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SubSection } from 'meta/assessment/section'
import { Link } from 'meta/cycleData/links/link'

export type RenderContext = {
  assessment: Assessment
  cycle: Cycle
  subSections: Array<SubSection>
  t: TFunction
}

export type CountryEntry = {
  countryIso: CountryIso
  countryName: string
  countryLinksUrl: string
  links: Array<Link>
}

export type LocationLink = {
  label: string
  url: string
}

// Util Props
export type LinkRenderProps = RenderContext & {
  countryIso: CountryIso
  link: Link
}

export type CountryRenderProps = RenderContext & {
  countryEntry: CountryEntry
}

export type RenderProps = RenderContext & {
  countryEntries: Array<CountryEntry>
}
