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

export type NdpPathProps = SectionPathProps & {
  year: number
}

// e.g. /assessments/fra/2025/X01/originalDataPoints/2015/extentOfForest
const ndpPath = (props: NdpPathProps): string => {
  const { countryIso, cycleName: cycle = cycleName, sectionName, year } = props
  return `/assessments/${assessmentName}/${cycle}/${countryIso}/originalDataPoints/${year}/${sectionName}`
}

const printTablesPath = (countryIso: CountryIso): string =>
  `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/tables`

export const SectionUtils = {
  ndpPath,
  path,
  printTablesPath,
}
