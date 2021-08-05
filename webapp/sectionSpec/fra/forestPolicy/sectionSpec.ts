import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = FRA.sections['6'].children.a
const variableMappings: any = {
  policiesSFM: VARIABLES.policies_supporting_SFM,
  legislationsSFM: VARIABLES.legislations_supporting_SFM,
  stakeholderParticipation: VARIABLES.platform_for_stakeholder_participation,
  existenceOfTraceabilitySystem: VARIABLES.existence_of_traceability_system,
}

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestPolicy,
  columnsExport: ['national', 'subnational'],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestPolicy.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestPolicy.areaUnitLabel',
          colSpan: 2,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestPolicy.national',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'forestPolicy.subnational',
        }),
      ],
    }),

    ...['policiesSFM', 'legislationsSFM', 'stakeholderParticipation', 'existenceOfTraceabilitySystem'].map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `forestPolicy.${variable}`,
        variableExport: variableMappings[variable],
        cols: [ColSpecFactory.newSelectYesNoInstance({}), ColSpecFactory.newSelectYesNoInstance({})],
      })
    ),
  ],
})

const forestPolicy = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
  descriptions: {
    analysisAndProcessing: false,
  },
})

export default forestPolicy
