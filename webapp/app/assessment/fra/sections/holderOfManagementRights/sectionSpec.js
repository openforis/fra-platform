import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as HolderOfManagementRightsState from '@webapp/app/assessment/fra/sections/holderOfManagementRights/holderOfManagementRightsState'

const section = FRA.sections['4'].children.b
const { years } = HolderOfManagementRightsState

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.holderOfManagementRights,
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
      [SectionSpec.KEYS_ROW.cols]: years.map(year =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.publicAdministration',
      [SectionSpec.KEYS_ROW.variableNo]: 'a',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.individuals',
      [SectionSpec.KEYS_ROW.variableNo]: 'b',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.privateBusinesses',
      [SectionSpec.KEYS_ROW.variableNo]: 'c',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.communities',
      [SectionSpec.KEYS_ROW.variableNo]: 'd',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'holderOfManagementRights.other',
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
