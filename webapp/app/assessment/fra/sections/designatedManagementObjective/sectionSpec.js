import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as DesignatedManagementObjectiveState from '@webapp/app/assessment/fra/sections/designatedManagementObjective/designatedManagementObjectiveState'

const section = FRA.sections['3'].children.a

const rowsHeader = [
  SectionSpec.newRowHeader([
    SectionSpec.newColHeader('designatedManagementObjective.categoryHeader', null, 2, 1, true),
    SectionSpec.newColHeader('designatedManagementObjective.areaUnitLabel', null, 1, FRA.yearsTable.length),
  ]),
  SectionSpec.newRowHeader(FRA.yearsTable.map(y => SectionSpec.newColHeader(null, y))),
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
  [SectionSpec.KEYS_TABLE.rows]: [
    ...rowsHeader,
    ...rowsData.map(r =>
      SectionSpec.newRowData(
        r.labelKey,
        FRA.yearsTable.map(() => SectionSpec.newColDecimal()),
        r.variableNo
      )
    ),
    SectionSpec.newRowData(
      'designatedManagementObjective.unknown',
      FRA.yearsTable.map(() => SectionSpec.newColCalculated(DesignatedManagementObjectiveState.getUnknown)),
      'g'
    ),
    SectionSpec.newRowData(
      'designatedManagementObjective.totalForestArea',
      FRA.yearsTable.map(() => SectionSpec.newColCalculated(ExtentOfForestState.getForestByYearFraIdx)),
      null,
      FRA.sections['1'].children.a.name
    ),
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
        SectionSpec.newRowData(
          r.labelKey,
          FRA.yearsTable.map(() => SectionSpec.newColDecimal())
        )
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
