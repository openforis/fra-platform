import * as R from 'ramda'

import * as NumberFormat from '@common/numberFormat'
import { FRA } from '@core/assessment'
import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

import * as NonWoodForestProductsRemovalsState from '@webapp/app/assessment/fra/sections/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsState'

const section = FRA.sections['7'].children.c

const tableSpec1 = SectionSpec.newTableSpec({
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
          [SectionSpec.KEYS_COL.className]: 'fra-table__nwfp-category-cell',
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
          [SectionSpec.KEYS_COL.className]: 'fra-table__nwfp-category-cell',
        }),
      ],
    }),
    ...R.range(1, 11).map((idx: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.label]: `#${idx}`,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          SectionSpec.newColInteger(),
          SectionSpec.newColText(),
          SectionSpec.newColInteger(),
          SectionSpec.newColSelect({
            [SectionSpec.KEYS_COL.optionsLabelKeyPrefix]: 'nonWoodForestProductsRemovals',
            [SectionSpec.KEYS_COL.options]: [
              { [SectionSpec.KEYS_COL.optionName]: 'plantProductsSelectHeading', type: SectionSpec.TypeSpec.header },
              { [SectionSpec.KEYS_COL.optionName]: 'food' },
              { [SectionSpec.KEYS_COL.optionName]: 'fodder' },
              { [SectionSpec.KEYS_COL.optionName]: 'rawMaterialForMedicine' },
              { [SectionSpec.KEYS_COL.optionName]: 'rawMaterialForColorants' },
              { [SectionSpec.KEYS_COL.optionName]: 'rawMaterialForUtensils' },
              { [SectionSpec.KEYS_COL.optionName]: 'ornamentalPlants' },
              { [SectionSpec.KEYS_COL.optionName]: 'exudates' },
              { [SectionSpec.KEYS_COL.optionName]: 'otherPlantProducts' },
              { [SectionSpec.KEYS_COL.optionName]: 'animalProductsSelectHeading', type: SectionSpec.TypeSpec.header },
              { [SectionSpec.KEYS_COL.optionName]: 'livingAnimals' },
              { [SectionSpec.KEYS_COL.optionName]: 'hidesSkins' },
              { [SectionSpec.KEYS_COL.optionName]: 'wildHoney' },
              { [SectionSpec.KEYS_COL.optionName]: 'wildMeat' },
              { [SectionSpec.KEYS_COL.optionName]: 'animalRawMaterialForMedicine' },
              { [SectionSpec.KEYS_COL.optionName]: 'animalRawMaterialForColorants' },
              { [SectionSpec.KEYS_COL.optionName]: 'otherEdibleAnimalProducts' },
              { [SectionSpec.KEYS_COL.optionName]: 'otherNonEdibleAnimalProducts' },
            ],
          }),
        ],
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
      [SectionSpec.KEYS_ROW.colSpan]: 5,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColInteger({ [SectionSpec.KEYS_COL.idx]: 4 }),
        SectionSpec.newColPlaceholder(),
      ],
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
      [SectionSpec.KEYS_ROW.colSpan]: 5,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColInteger({ [SectionSpec.KEYS_COL.idx]: 4 }),
        SectionSpec.newColPlaceholder(),
      ],
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.total',
      [SectionSpec.KEYS_ROW.colSpan]: 5,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: NonWoodForestProductsRemovalsState.getNonWoodForestProductsTotal,
          [SectionSpec.KEYS_COL.formatFn]: NumberFormat.formatInteger,
          [SectionSpec.KEYS_COL.idx]: 4,
        }),
        SectionSpec.newColPlaceholder(),
      ],
    }),
  ],
})

const tableSpec2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.nonWoodForestProductsRemovalsCurrency,
  [SectionSpec.KEYS_TABLE.secondary]: true,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'nonWoodForestProductsRemovals.currency',
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColText()],
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1, tableSpec2],
})

const nonWoodForestProductsRemovals = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.dataExport]: { [SectionSpec.KEYS_DATA_EXPORT.included]: false },
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default nonWoodForestProductsRemovals
