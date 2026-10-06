import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

const _assessmentName = AssessmentNames.fra
const _cycleName = CycleNames._2025

type SectionPathProps = {
  countryIso: CountryIso
  cycleName?: CycleNames
  sectionName: string
}

const path = (props: SectionPathProps): string => {
  const { countryIso, cycleName = _cycleName, sectionName } = props
  return `/assessments/${_assessmentName}/${cycleName}/${countryIso}/sections/${sectionName}`
}

export type NdpPathProps = SectionPathProps & {
  year: number
}

// e.g. /assessments/fra/2025/X01/originalDataPoints/2015/extentOfForest
const ndpPath = (props: NdpPathProps): string => {
  const { countryIso, cycleName = _cycleName, sectionName, year } = props
  return `/assessments/${_assessmentName}/${cycleName}/${countryIso}/originalDataPoints/${year}/${sectionName}`
}

const printTablesPath = (countryIso: CountryIso, cycleName: CycleNames = _cycleName): string =>
  `/assessments/${_assessmentName}/${cycleName}/${countryIso}/print/tables`

export const SectionUtils = {
  ndpPath,
  path,
  printTablesPath,
}
