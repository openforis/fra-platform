import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ExtentOfForestValidator from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

import { updateTableWithOdpCell } from '@webapp/app/assessment/components/dataTable/actions'

const section = FRA.sections['1'].children.a

const rowsEOF = [
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: [
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'extentOfForest.categoryHeader',
        [SectionSpec.KEYS_COL.rowSpan]: 2,
        [SectionSpec.KEYS_COL.left]: true,
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'extentOfForest.areaUnitLabel',
        [SectionSpec.KEYS_COL.colSpan]: null,
      }),
    ],
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'extentOfForest.forestArea',
    [SectionSpec.KEYS_ROW.variableNo]: 'a',
    [SectionSpec.KEYS_ROW.validator]: ExtentOfForestValidator.forestAreaValidator,
    [SectionSpec.KEYS_ROW.variableName]: 'forestArea',
    [SectionSpec.KEYS_ROW.chartProps]: {
      [SectionSpec.KEYS_ROW_CHART.labelKey]: 'fraClass.forest',
      [SectionSpec.KEYS_ROW_CHART.color]: '#0098a6',
    },
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'fraClass.otherWoodedLand',
    [SectionSpec.KEYS_ROW.variableNo]: 'a',
    [SectionSpec.KEYS_ROW.validator]: ExtentOfForestValidator.otherWoodedLandValidator,
    [SectionSpec.KEYS_ROW.variableName]: 'otherWoodedLand',
    [SectionSpec.KEYS_ROW.chartProps]: {
      [SectionSpec.KEYS_ROW_CHART.labelKey]: 'fraClass.otherWoodedLand',
      [SectionSpec.KEYS_ROW_CHART.color]: '#bf00af',
    },
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'fraClass.otherLand',
    [SectionSpec.KEYS_ROW.variableNo]: 'c-a-b',
    [SectionSpec.KEYS_ROW.validator]: ExtentOfForestValidator.areasNotExceedingTotalLandAreaValidator,
    [SectionSpec.KEYS_ROW.variableName]: 'otherLand',
    [SectionSpec.KEYS_ROW.calculateFn]: ExtentOfForestState.getOtherLand,
  }),
  SectionSpec.newRowData({
    [SectionSpec.KEYS_ROW.labelKey]: 'extentOfForest.totalLandArea',
    [SectionSpec.KEYS_ROW.variableNo]: 'c',
    [SectionSpec.KEYS_ROW.variableName]: 'faoStat',
    [SectionSpec.KEYS_ROW.calculateFn]: ExtentOfForestState.getFaoStatArea,
  }),
  SectionSpec.newRowNoticeMessage({
    [SectionSpec.KEYS_ROW.labelKey]: 'extentOfForest.tableNoticeMessage',
    [SectionSpec.KEYS_ROW.rowSpan]: 2,
  }),
  SectionSpec.newRowValidationMessages({
    [SectionSpec.KEYS_ROW.getValidationMessages]: ExtentOfForestValidator.getValidationMessages,
  }),
]

const rowsClimaticDomain = [
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: [
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'climaticDomain.climaticDomain',
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'climaticDomain.percentOfForestArea2015',
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'climaticDomain.percentOfForestArea2015Override',
      }),
    ],
  }),
  ...ExtentOfForestState.rowsClimaticDomain.map(row =>
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `climaticDomain.${row}`,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: ExtentOfForestState.getClimaticDomainConfigValue,
          [SectionSpec.KEYS_COL.idx]: -1,
        }),
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.idx]: 0,
        }),
      ],
    })
  ),
]

const tableSpec1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.extentOfForest,
  [SectionSpec.KEYS_TABLE.rows]: rowsEOF,
  [SectionSpec.KEYS_TABLE.getSectionData]: ExtentOfForestState.getExtentOfForestData,
  [SectionSpec.KEYS_TABLE.isSectionDataEmpty]: ExtentOfForestState.isExtentOfForestEmpty,
  [SectionSpec.KEYS_TABLE.odp]: true,
  [SectionSpec.KEYS_TABLE.showOdpChart]: true,
  [SectionSpec.KEYS_TABLE.canGenerateValues]: ExtentOfForestState.hasOriginalDataPoints,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: updateTableWithOdpCell,
})

const tableSpec2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.climaticDomain,
  [SectionSpec.KEYS_TABLE.rows]: rowsClimaticDomain,
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1, tableSpec2],
})

const extentOfForest = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: ExtentOfForestState.useDescriptions,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: ExtentOfForestState.useDescriptions,
  },
})

export default extentOfForest
