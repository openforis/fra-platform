import { FRA } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'
import * as OtherLandWithTreeCoverState from '@webapp/app/assessment/fra/sections/otherLandWithTreeCover/otherLandWithTreeCoverState'
import * as OtherLandWithTreeCoverValidatorState from '@webapp/app/assessment/fra/sections/otherLandWithTreeCover/otherLandWithTreeCoverValidatorState'

const section = FRA.sections['1'].children.f
const { yearsTable } = FRA

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.otherLandWithTreeCover,
  [SectionSpec.KEYS_TABLE.columnsExport]: yearsTable,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
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
          [SectionSpec.KEYS_COL.labelKey]: 'otherLandWithTreeCover.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'otherLandWithTreeCover.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: yearsTable.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map((yearRange: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.palms',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.palms,
      [SectionSpec.KEYS_ROW.variableNo]: 'a',
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.treeorchards',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.tree_orchards,
      [SectionSpec.KEYS_ROW.variableNo]: 'b',
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.agroforestry',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.agroforestry,
      [SectionSpec.KEYS_ROW.variableNo]: 'c',
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.treesinurbansettings',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.trees_in_urban_settings,
      [SectionSpec.KEYS_ROW.variableNo]: 'd',
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.other',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.other,
      [SectionSpec.KEYS_ROW.variableNo]: 'e',
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.total',
      [SectionSpec.KEYS_ROW.variableNo]: 'a+b+c+d+e',
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: OtherLandWithTreeCoverState.getOtherLandWithTreeCoverTotal,
          [SectionSpec.KEYS_COL.validator]: OtherLandWithTreeCoverValidatorState.otherLandWithTreeCoverTotalValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'otherLandWithTreeCover.otherLandArea',
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: OtherLandWithTreeCoverState.getOtherLand,
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: OtherLandWithTreeCoverValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const otherLandWithTreeCover = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default otherLandWithTreeCover
