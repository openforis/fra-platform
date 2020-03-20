import * as R from 'ramda'

import * as NumberFormat from '@common/numberFormat'
import * as FRA from '@common/assessment/fra'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as NonWoodForestProductsRemovalsState from '@webapp/app/assessment/fra/sections/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsState'

const section = FRA.sections['7'].children.c

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.nonWoodForestProductsRemovals,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({}),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'nonWoodForestProductsRemovals.nameOfProduct',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'nonWoodForestProductsRemovals.keySpecies',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'nonWoodForestProductsRemovals.quantity',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'nonWoodForestProductsRemovals.unit',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'nonWoodForestProductsRemovals.value',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'nonWoodForestProductsRemovals.category',
        }),
      ],
    }),
    ...R.range(1, 11).map(idx =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.label]: `#${idx}`,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          SectionSpec.newColDecimal(),
          SectionSpec.newColText(),
          SectionSpec.newColDecimal(),
          SectionSpec.newColText(),
        ],
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
      [SectionSpec.KEYS_ROW.colSpan]: 5,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColDecimal(), SectionSpec.newColPlaceholder()],
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
      [SectionSpec.KEYS_ROW.colSpan]: 5,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColDecimal(), SectionSpec.newColPlaceholder()],
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.total',
      [SectionSpec.KEYS_ROW.colSpan]: 5,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: NonWoodForestProductsRemovalsState.getNonWoodForestProductsTotal,
          [SectionSpec.KEYS_COL.formatFn]: NumberFormat.formatInteger,
        }),
        SectionSpec.newColPlaceholder(),
      ],
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const nonWoodForestProductsRemovals = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default nonWoodForestProductsRemovals
