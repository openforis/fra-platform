import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'

export const path = (countryIso: CountryIso, cycleName: CycleNames = CycleNames._2025): string =>
  Routes.CountryHomeSection.generatePath({
    assessmentName: AssessmentNames.fra,
    countryIso,
    cycleName,
    sectionName: SectionNames.Country.Home.linksStatus,
  })
