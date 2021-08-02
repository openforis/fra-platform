import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = FRA.sections['5'].children.c

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.degradedForest,
  rows: [
    RowSpecFactory.newDataInstance({
      labelKey: 'degradedForest.doesYourCountryMonitor',
      variableExport: VARIABLES.does_country_monitor,
      colSpan: 2,
      mainCategory: true,
      cols: [ColSpecFactory.newSelectYesNoInstance({})],
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'degradedForest.ifYes',
      variableExport: VARIABLES.national_definition,
      rowSpan: 2,
      cols: [
        ColSpecFactory.newPlaceholderInstance({
          labelKey: 'degradedForest.whatIsDefinition',
          idx: -1,
        }),
        ColSpecFactory.newTextAreaInstance({
          idx: 1,
        }),
      ],
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'degradedForest.howMonitored',
      variableExport: VARIABLES.how_monitored,
      cols: [
        ColSpecFactory.newTextAreaInstance({
          idx: 0,
        }),
      ],
    }),
  ],
})

const degradedForest = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  dataExport: { included: false },
  descriptions: {
    nationalData: false,
    analysisAndProcessing: false,
  },
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default degradedForest
