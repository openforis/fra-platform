import { Assessment } from '../../../src/meta/assessment/assessment'
import { AssessmentNames } from '../../../src/meta/assessment/assessmentName'
import { CycleUuid } from '../../../src/meta/assessment/cycle'
import { Description } from '../../../src/meta/assessment/description'
import { Section, SubSection } from '../../../src/meta/assessment/section'
import { DescriptionsSpec, SectionSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids, getLabels } from './utils'

export const getSection = (props: { assessment: Assessment; index: number; labelKey: string }): Section => {
  const { assessment, index, labelKey } = props
  const cycleUuids = getCycleUuids({ assessment })
  return {
    props: {
      anchors: cycleUuids.reduce((acc, cycleUuid) => ({ ...acc, [cycleUuid]: String(index === 0 ? '' : index) }), {}),
      cycles: cycleUuids,
      labels: getLabels({ assessment, label: { key: labelKey } }),
      index,
    },
  }
}

const panEuropeanDescription = (descriptions: DescriptionsSpec): Description => {
  return {
    comments: true,
    nationalData: {
      dataSources: {
        linkedVariables: descriptions.linkedVariables,
        table: {},
      },
    },
  }
}

const transformDescription = (descriptions: DescriptionsSpec, cycleName: string): Description => {
  const is2025 = cycleName === '2025'

  const description: Description = {}

  if (descriptions.analysisAndProcessing) {
    description.analysisAndProcessing = {
      estimationAndForecasting: true,
      reclassification: true,
    }
  }

  if (descriptions.comments) {
    description.comments = true
  }

  if (descriptions.introductoryText) {
    description.introductoryText = true
  }

  if (descriptions.nationalData) {
    description.nationalData = {
      dataSources: {
        table: is2025 ? {} : undefined,
        text: {
          readOnly: is2025,
        },
      },
      nationalClassification: true,
      originalData: true,
    }
  }

  return description
}

const getDescriptions = (props: {
  assessment: Assessment
  descriptions: DescriptionsSpec
}): Record<CycleUuid, Description> => {
  const { assessment, descriptions } = props
  const {
    props: { name },
    cycles,
  } = assessment
  const isPanEuropean = name === AssessmentNames.panEuropean

  if (isPanEuropean) {
    return cycles.reduce(
      (acc, cycle) => ({
        ...acc,
        [cycle.uuid]: panEuropeanDescription(descriptions),
      }),
      {}
    )
  }

  return cycles.reduce(
    (acc, cycle) => ({
      ...acc,
      [cycle.uuid]: transformDescription(descriptions, cycle.name),
    }),
    {}
  )
}

export const getSubSection = (props: { assessment: Assessment; spec: SectionSpec; index: number }): SubSection => {
  const { assessment, spec, index } = props
  const isPanEuropean = assessment.props.name === 'panEuropean'

  const anchors = assessment.cycles.reduce<Record<string, string>>((acc, cycle) => {
    const accUpdate = { ...acc }
    if (spec.migration?.anchors) {
      const anchor = spec.migration.anchors[cycle.name]
      if (anchor) {
        accUpdate[cycle.uuid] = anchor
      }
    } else {
      accUpdate[cycle.uuid] = spec.sectionAnchor
    }
    return accUpdate
  }, {})

  const section: SubSection = {
    props: {
      anchors,
      name: spec.sectionName,
      cycles: getCycleUuids({ assessment, migration: spec.migration }),
      index,
      labels: getLabels({
        assessment,
        label: { key: `${isPanEuropean ? 'panEuropean.' : ''}${spec.sectionName}.${spec.sectionName}` },
        migration: spec.migration,
      }),
      showTitle: spec.showTitle,
      descriptions: getDescriptions({ assessment, descriptions: spec.descriptions }),
    },
  }
  if (spec.dataExport?.included) {
    section.props.dataExport = spec.dataExport.included
  }
  if (spec.migration?.hidden) section.props.hidden = spec.migration.hidden

  return section
}
