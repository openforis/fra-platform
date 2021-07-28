import { FRA } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

import * as HolderOfManagementRightsState from '@webapp/app/assessment/fra/sections/holderOfManagementRights/holderOfManagementRightsState'

const section = FRA.sections['4'].children.b
const { years } = HolderOfManagementRightsState

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.holderOfManagementRights,
  [SectionSpec.KEYS_TABLE.columnsExport]: years,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['4'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['4'].children.a.tables.forestOwnership,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'holderOfManagementRights.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'holderOfManagementRights.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.publicAdministration',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.public_administration,
      [SectionSpec.KEYS_ROW.variableNo]: 'a',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.individuals',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.individuals,
      [SectionSpec.KEYS_ROW.variableNo]: 'b',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.privateBusinesses',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.private_businesses,
      [SectionSpec.KEYS_ROW.variableNo]: 'c',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.communities',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.communities,
      [SectionSpec.KEYS_ROW.variableNo]: 'd',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.other',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.other_or_unknown,
      [SectionSpec.KEYS_ROW.variableNo]: 'e',
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: HolderOfManagementRightsState.getOther,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.totalPublicOwnership',
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['4'].children.a.name,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: HolderOfManagementRightsState.getTotalPublicOwnership,
        })
      ),
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const holderOfManagementRights = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default holderOfManagementRights
