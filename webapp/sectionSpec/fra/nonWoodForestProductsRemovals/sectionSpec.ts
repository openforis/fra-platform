import { FRA } from '@core/assessment'
import { Arrays } from '@core/utils'
import * as NumberFormat from '@common/numberFormat'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { TypeSpec } from '@webapp/sectionSpec/typeSpec'

import * as NonWoodForestProductsRemovalsState from '@webapp/sectionSpec/fra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsState'

const section = FRA.sections['7'].children.c

const tableSpec1 = TableSpecFactory.newInstance({
  name: section.tables.nonWoodForestProductsRemovals,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({}),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'nonWoodForestProductsRemovals.nameOfProduct',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'nonWoodForestProductsRemovals.keySpecies',
          className: 'fra-table__nwfp-category-cell',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'nonWoodForestProductsRemovals.quantity',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'nonWoodForestProductsRemovals.unit',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'nonWoodForestProductsRemovals.value',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'nonWoodForestProductsRemovals.category',
          className: 'fra-table__nwfp-category-cell',
        }),
      ],
    }),
    ...Arrays.range(1, 11).map((idx) =>
      RowSpecFactory.newDataInstance({
        label: `#${idx}`,
        cols: [
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newIntegerInstance({}),
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newIntegerInstance({}),
          ColSpecFactory.newSelectInstance({
            optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
            options: [
              { optionName: 'plantProductsSelectHeading', type: TypeSpec.header },
              { optionName: 'food' },
              { optionName: 'fodder' },
              { optionName: 'rawMaterialForMedicine' },
              { optionName: 'rawMaterialForColorants' },
              { optionName: 'rawMaterialForUtensils' },
              { optionName: 'ornamentalPlants' },
              { optionName: 'exudates' },
              { optionName: 'otherPlantProducts' },
              { optionName: 'animalProductsSelectHeading', type: TypeSpec.header },
              { optionName: 'livingAnimals' },
              { optionName: 'hidesSkins' },
              { optionName: 'wildHoney' },
              { optionName: 'wildMeat' },
              { optionName: 'animalRawMaterialForMedicine' },
              { optionName: 'animalRawMaterialForColorants' },
              { optionName: 'otherEdibleAnimalProducts' },
              { optionName: 'otherNonEdibleAnimalProducts' },
            ],
          }),
        ],
      })
    ),
    RowSpecFactory.newDataInstance({
      labelKey: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
      colSpan: 5,
      mainCategory: true,
      cols: [ColSpecFactory.newIntegerInstance({ idx: 4 }), ColSpecFactory.newPlaceholderInstance({})],
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
      colSpan: 5,
      mainCategory: true,
      cols: [ColSpecFactory.newIntegerInstance({ idx: 4 }), ColSpecFactory.newPlaceholderInstance({})],
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'nonWoodForestProductsRemovals.total',
      colSpan: 5,
      mainCategory: true,
      cols: [
        ColSpecFactory.newCalculatedInstance({
          calculateFn: NonWoodForestProductsRemovalsState.getNonWoodForestProductsTotal,
          formatFn: NumberFormat.formatInteger,
          idx: 4,
        }),
        ColSpecFactory.newPlaceholderInstance({}),
      ],
    }),
  ],
})

const tableSpec2 = TableSpecFactory.newInstance({
  name: section.tables.nonWoodForestProductsRemovalsCurrency,
  secondary: true,
  rows: [
    RowSpecFactory.newDataInstance({
      labelKey: 'nonWoodForestProductsRemovals.currency',
      mainCategory: true,
      cols: [ColSpecFactory.newTextInstance({})],
    }),
  ],
})

const nonWoodForestProductsRemovals = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  dataExport: { included: false },
  descriptions: {
    analysisAndProcessing: false,
  },
  tableSections: [{ tableSpecs: [tableSpec1, tableSpec2] }],
})

export default nonWoodForestProductsRemovals
