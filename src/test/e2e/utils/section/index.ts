import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

type SectionPathProps = {
  countryIso: CountryIso
  sectionName: string
}

const path = (props: SectionPathProps): string => {
  const { countryIso, sectionName } = props
  return `/assessments/${assessmentName}/${cycleName}/${countryIso}/sections/${sectionName}`
}

export const SectionUtils = {
  path,
}
