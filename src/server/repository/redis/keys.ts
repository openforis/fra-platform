import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

enum Data {
  data = 'data',
}

enum Section {
  sections = 'sections',
  sectionsIndex = 'sectionsIndex',
  sectionsMetadata = 'sectionsMetadata',
  subSectionsIndex = 'subSectionsIndex',
}

type PropsCycle = {
  assessment: Assessment
  cycle: Cycle
  key: string
}

type PropsCountry = PropsCycle & {
  countryIso: CountryIso
}

export const getKeyCycle = (props: PropsCycle): string => {
  const { assessment, cycle, key } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return `${key}:${assessmentName}-${cycleName}`
}

export const getKeyCountry = (props: PropsCountry): string => {
  const { assessment, cycle, countryIso, key } = props
  return `${getKeyCycle({ assessment, cycle, key })}-${countryIso}`
}

export const Keys = {
  Data,
  Section,
}
