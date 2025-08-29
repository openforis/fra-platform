import { CountryIso } from 'meta/area'
import { Assessment as AssessmentType } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

// ===== Keys

enum Area {
  country = 'area:country',
  regionGroups = 'area:regionGroups',
}

enum Assessment {
  assessment = 'assessment',
}

enum Data {
  data = 'data',
}

enum Explorer {
  metadata = 'explorer:metadata',
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
  Assessment,
  Data,
  Row,
  Section,
  Area,
  Explorer,
}

// ===== Getters

type Key = string

type PropsAssessment = {
  assessment: AssessmentType
  key: Key
}
type PropsCycle = PropsAssessment & {
  cycle: Cycle
}
type PropsCountry = PropsCycle & {
  countryIso: CountryIso
}

// Identity function
export const getKeyId = ({ key }: { key: Key }): Key => {
  return key
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
  const { assessment, countryIso, cycle, key } = props
  return `${getKeyCycle({ assessment, cycle, key })}-${countryIso}`
}

export const getKeyRow = (props: { assessment: AssessmentType }): string =>
  getKeyAssessment({ assessment: props.assessment, key: Keys.Row.row })
