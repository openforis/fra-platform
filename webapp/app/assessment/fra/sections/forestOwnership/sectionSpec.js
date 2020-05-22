import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ForestOwnershipState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipState'
import * as ForestOwnershipValidatorState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipValidatorState'

const section = FRA.sections['4'].children.a
const { years } = ForestOwnershipState

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestOwnership,
  [SectionSpec.KEYS_TABLE.columnsExport]: years,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestOwnership.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestOwnership.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.privateOwnership',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.private_ownership,
      [SectionSpec.KEYS_ROW.variableNo]: 'a',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.ofWhichIndividuals',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.of_which_by_individuals,
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.ofWhichPrivateBusinesses',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.of_which_by_private_businesses,
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.ofWhichCommunities',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.of_which_by_communities,
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.privateOwnershipValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.publicOwnership',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.public_ownership,
      [SectionSpec.KEYS_ROW.variableNo]: 'b',
      [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.otherOrUnknown',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.other_or_unknown,
      [SectionSpec.KEYS_ROW.variableNo]: 'c',
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: ForestOwnershipState.getOtherOrUnknown,
          [SectionSpec.KEYS_COL.validator]: ForestOwnershipValidatorState.otherOrUnknownValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestOwnership.totalForestArea',
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_ROW.cols]: years.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: (colIdx) => ExtentOfForestState.getForestByYearFraIdx(colIdx),
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: ForestOwnershipValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestOwnership = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestOwnership
