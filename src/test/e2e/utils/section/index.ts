import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

type SectionPathProps = {
  countryIso: CountryIso
  cycleName?: CycleNames
  sectionName: string
}

const path = (props: SectionPathProps): string => {
  const { countryIso, cycleName: cycle = cycleName, sectionName } = props
  return `/assessments/${assessmentName}/${cycle}/${countryIso}/sections/${sectionName}`
}

const printTablesPath = (countryIso: CountryIso): string =>
  `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/tables`

export const SectionUtils = {
  path,
  printTablesPath,
}
