import { Description } from '../../../src/meta/assessment'
import { Assessment } from '../../../src/meta/assessment/assessment'
import { Section, SubSection } from '../../../src/meta/assessment/section'
import { DescriptionsSpec, SectionSpec } from '../../../src/test/sectionSpec'
import { CycleUuid, getCycleUuids, getLabels } from './utils'

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

const fraColumns = ['reference', 'type', 'fraVariables', 'year', 'comments']

const panEuropeanColumns = ['reference', 'type', 'variable', 'year', 'comments']

const panEuropeanDescription = {
  comments: true,
  nationalData: {
    dataSources: {
      table: {
        columns: [...panEuropeanColumns],
      },
    },
  },
}

const transformDescription = (descriptions: DescriptionsSpec): Description => {
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
        table: {
          columns: [...fraColumns],
        },
      },
      nationalClassification: true,
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
  const isPanEuropean = name === 'panEuropean'

  if (isPanEuropean) {
    return cycles.reduce(
      (acc, cycle) => ({
        ...acc,
        [cycle.uuid]: panEuropeanDescription,
      }),
      {}
    )
  }

  return cycles.reduce(
    (acc, cycle) => ({
      ...acc,
      [cycle.uuid]: transformDescription(descriptions),
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
  return section
}
