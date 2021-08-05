import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import * as ExtentOfForestValidator from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestValidatorState'
import { updateTableWithOdpCell } from '@webapp/components/Assessment/DataTable/actions'

const section = FRA.sections['1'].children.a

const rowsEOF = [
  RowSpecFactory.newHeaderInstance({
    cols: [
      ColSpecFactory.newHeaderInstance({
        labelKey: 'extentOfForest.categoryHeader',
        rowSpan: 2,
        left: true,
      }),
      ColSpecFactory.newHeaderInstance({
        labelKey: 'extentOfForest.areaUnitLabel',
        colSpan: null,
      }),
    ],
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'extentOfForest.forestArea',
    variableNo: 'a',
    validator: ExtentOfForestValidator.forestAreaValidator,
    variableName: 'forestArea',
    variableExport: VARIABLES.forest_area,
    chartProps: {
      labelKey: 'fraClass.forest',
      color: '#0098a6',
    },
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'fraClass.otherWoodedLand',
    variableNo: 'a',
    validator: ExtentOfForestValidator.otherWoodedLandValidator,
    variableName: 'otherWoodedLand',
    variableExport: VARIABLES.other_wooded_land,
    chartProps: {
      labelKey: 'fraClass.otherWoodedLand',
      color: '#bf00af',
    },
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'fraClass.otherLand',
    variableNo: 'c-a-b',
    validator: ExtentOfForestValidator.areasNotExceedingTotalLandAreaValidator,
    variableName: 'otherLand',
    variableExport: VARIABLES.other_land,
    calculateFn: ExtentOfForestState.getOtherLand,
  }),
  RowSpecFactory.newDataInstance({
    labelKey: 'extentOfForest.totalLandArea',
    variableNo: 'c',
    variableName: 'faoStat',
    variableExport: VARIABLES.total_land_area,
    calculateFn: ExtentOfForestState.getFaoStatArea,
  }),
  RowSpecFactory.newNoticeMessageInstance({
    labelKey: 'extentOfForest.tableNoticeMessage',
    rowSpan: 2,
  }),
  RowSpecFactory.newValidationMessagesInstance({
    getValidationMessages: ExtentOfForestValidator.getValidationMessages,
  }),
]

const rowsClimaticDomain = [
  RowSpecFactory.newHeaderInstance({
    cols: [
      ColSpecFactory.newHeaderInstance({
        labelKey: 'climaticDomain.climaticDomain',
      }),
      ColSpecFactory.newHeaderInstance({
        labelKey: 'climaticDomain.percentOfForestArea2015',
      }),
      ColSpecFactory.newHeaderInstance({
        labelKey: 'climaticDomain.percentOfForestArea2015Override',
      }),
    ],
  }),
  ...ExtentOfForestState.rowsClimaticDomain.map((row) =>
    RowSpecFactory.newDataInstance({
      labelKey: `climaticDomain.${row}`,
      cols: [
        ColSpecFactory.newCalculatedInstance({
          calculateFn: ExtentOfForestState.getClimaticDomainConfigValue,
          idx: -1,
        }),
        ColSpecFactory.newDecimalInstance({
          idx: 0,
        }),
      ],
    })
  ),
]

const tableSpec1 = TableSpecFactory.newInstance({
  name: section.tables.extentOfForest,
  columnsExport: FRA.years,
  rows: rowsEOF,
  getSectionData: ExtentOfForestState.getExtentOfForestData,
  isSectionDataEmpty: ExtentOfForestState.isExtentOfForestEmpty,
  odp: true,
  odpVariables: ExtentOfForestState.variables,
  showOdpChart: true,
  canGenerateValues: ExtentOfForestState.hasOriginalDataPoints,
  updateTableDataCell: updateTableWithOdpCell,
  unit: Unit.haThousand,
})

const tableSpec2 = TableSpecFactory.newInstance({
  dataExport: false,
  name: section.tables.climaticDomain,
  rows: rowsClimaticDomain,
})

const extentOfForest = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec1, tableSpec2] }],
  descriptions: {
    nationalData: ExtentOfForestState.useDescriptions,
    analysisAndProcessing: ExtentOfForestState.useDescriptions,
  },
})

export default extentOfForest
