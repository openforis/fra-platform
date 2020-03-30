import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as DesignatedManagementObjectiveState from '@webapp/app/assessment/fra/sections/designatedManagementObjective/designatedManagementObjectiveState'

const section = FRA.sections['3'].children.a

const rowsHeader = [
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: [
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'designatedManagementObjective.categoryHeader',
        [SectionSpec.KEYS_COL.rowSpan]: 2,
        [SectionSpec.KEYS_COL.left]: true,
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'designatedManagementObjective.areaUnitLabel',
        [SectionSpec.KEYS_COL.colSpan]: FRA.yearsTable.length,
      }),
    ],
  }),
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: FRA.yearsTable.map(y => SectionSpec.newColHeader({ [SectionSpec.KEYS_COL.label]: y })),
  }),
]

const rowsData = [
  { labelKey: 'designatedManagementObjective.production', variableNo: 'a' },
  { labelKey: 'designatedManagementObjective.soilWaterProtection', variableNo: 'b' },
  { labelKey: 'designatedManagementObjective.biodiversityConservation', variableNo: 'c' },
  { labelKey: 'designatedManagementObjective.socialServices', variableNo: 'd' },
  { labelKey: 'designatedManagementObjective.multipleUse', variableNo: 'e' },
  { labelKey: 'designatedManagementObjective.other', variableNo: 'f' },
]

const tableSpec1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.primaryDesignatedManagementObjective,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    ...rowsHeader,
    ...rowsData.map(r =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: r.labelKey,
        [SectionSpec.KEYS_ROW.cols]: FRA.yearsTable.map(() => SectionSpec.newColDecimal()),
        [SectionSpec.KEYS_ROW.variableNo]: r.variableNo,
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'designatedManagementObjective.unknown',
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsTable.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: DesignatedManagementObjectiveState.getUnknown,
        })
      ),
      [SectionSpec.KEYS_ROW.variableNo]: 'g',
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'designatedManagementObjective.totalForestArea',
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsTable.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: ExtentOfForestState.getForestByYearFraIdx,
        })
      ),
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.a.name,
    }),
  ],
})

const tableSection1 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1],
  [SectionSpec.KEYS_TABLE_SECTION.titleKey]: 'designatedManagementObjective.primaryDesignatedManagementObjective',
  [SectionSpec.KEYS_TABLE_SECTION.descriptionKey]:
    'designatedManagementObjective.primaryDesignatedManagementObjectiveSupport',
})

const tableSpec2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.totalAreaWithDesignatedManagementObjective,
  [SectionSpec.KEYS_TABLE.rows]: [
    ...rowsHeader,
    ...rowsData
      .filter(r => r.variableNo !== 'e')
      .map(r =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: r.labelKey,
          [SectionSpec.KEYS_ROW.cols]: FRA.yearsTable.map(() => SectionSpec.newColDecimal()),
        })
      ),
  ],
})

const tableSection2 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec2],
  [SectionSpec.KEYS_TABLE_SECTION.titleKey]: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjective',
  [SectionSpec.KEYS_TABLE_SECTION.descriptionKey]:
    'designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport',
})

const designatedManagementObjective = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection1, tableSection2],
})

export default designatedManagementObjective
