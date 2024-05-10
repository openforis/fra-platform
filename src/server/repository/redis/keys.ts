import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

// ===== Keys

enum Data {
  data = 'data',
}
enum Row {
  row = 'row',
}
enum Section {
  sections = 'sections',
  sectionsIndex = 'sectionsIndex',
  sectionsMetadata = 'sectionsMetadata',
  subSectionsIndex = 'subSectionsIndex',
}

export const Keys = {
  Data,
  Row,
  Section,
}

// ===== Getters

type PropsAssessment = {
  assessment: Assessment
  key: string
}
type PropsCycle = PropsAssessment & {
  cycle: Cycle
}
type PropsCountry = PropsCycle & {
  countryIso: AreaCode
}

export const getKeyAssessment = (props: PropsAssessment): string => {
  const { assessment, key } = props
  return `${key}:${assessment.props.name}`
}

export const getKeyCycle = (props: PropsCycle): string => {
  const { assessment, cycle, key } = props
  return `${getKeyAssessment({ assessment, key })}-${cycle.name}`
}

export const getKeyCountry = (props: PropsCountry): string => {
  const { assessment, cycle, countryIso, key } = props
  return `${getKeyCycle({ assessment, cycle, key })}-${countryIso}`
}

export const getKeyRow = (props: { assessment: Assessment }): string =>
  getKeyAssessment({ assessment: props.assessment, key: Keys.Row.row })
