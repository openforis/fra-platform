// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

export const nonWoodForestProductsRemovals: SectionSpec = {
  sectionName: 'nonWoodForestProductsRemovals',
  sectionAnchor: '7c',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'nonWoodForestProductsRemovals',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  className: 'fra-table__header-cell',
                  label: '',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.nameOfProduct',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.keySpecies',
                  className: 'fra-table__header-cell fra-table__nwfp-category-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.quantity',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.unit',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.value',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.category',
                  className: 'fra-table__header-cell fra-table__nwfp-category-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#1',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#1',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_1['product_name'], nonWoodForestProductsRemovals.product_1['category'])`,
                ],
              },
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#2',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#2',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_2['product_name'], nonWoodForestProductsRemovals.product_2['category'])`,
                ],
              },
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#3',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#3',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_3['product_name'], nonWoodForestProductsRemovals.product_3['category'])`,
                ],
              },
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#4',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#4',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_4['product_name'], nonWoodForestProductsRemovals.product_4['category'])`,
                ],
              },
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#5',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#5',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_5['product_name'], nonWoodForestProductsRemovals.product_5['category'])`,
                ],
              },
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#6',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#6',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_6['product_name'], nonWoodForestProductsRemovals.product_6['category'])`,
                ],
              },
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#7',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#7',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_7['product_name'], nonWoodForestProductsRemovals.product_7['category'])`,
                ],
              },
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#8',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#8',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_8['product_name'], nonWoodForestProductsRemovals.product_8['category'])`,
                ],
              },
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#9',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#9',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_9['product_name'], nonWoodForestProductsRemovals.product_9['category'])`,
                ],
              },
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  label: '#10',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                {
                  idx: 2,
                  type: 'integer',
                },
                {
                  idx: 3,
                  type: 'text',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 5,
                  type: 'select',
                  options: [
                    {
                      optionName: 'plantProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'food',
                    },
                    {
                      optionName: 'fodder',
                    },
                    {
                      optionName: 'rawMaterialForMedicine',
                    },
                    {
                      optionName: 'rawMaterialForColorants',
                    },
                    {
                      optionName: 'rawMaterialForUtensils',
                    },
                    {
                      optionName: 'ornamentalPlants',
                    },
                    {
                      optionName: 'exudates',
                    },
                    {
                      optionName: 'otherPlantProducts',
                    },
                    {
                      optionName: 'animalProductsSelectHeading',
                      type: 'header',
                    },
                    {
                      optionName: 'livingAnimals',
                    },
                    {
                      optionName: 'hidesSkins',
                    },
                    {
                      optionName: 'wildHoney',
                    },
                    {
                      optionName: 'wildMeat',
                    },
                    {
                      optionName: 'animalRawMaterialForMedicine',
                    },
                    {
                      optionName: 'animalRawMaterialForColorants',
                    },
                    {
                      optionName: 'otherEdibleAnimalProducts',
                    },
                    {
                      optionName: 'otherNonEdibleAnimalProducts',
                    },
                  ],
                  optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                },
              ],
              label: '#10',
              migration: {
                validateFns: [
                  `NWFPProductHasCategory(nonWoodForestProductsRemovals.product_10['product_name'], nonWoodForestProductsRemovals.product_10['category'])`,
                ],
              },
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 5,
                  labelKey: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 1,
                  type: 'placeholder',
                },
              ],
              labelKey: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
              colSpan: 5,
              mainCategory: true,
              migration: {
                colNames: ['value'],
              },
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 5,
                  labelKey: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 4,
                  type: 'integer',
                },
                {
                  idx: 1,
                  type: 'placeholder',
                },
              ],
              labelKey: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
              colSpan: 5,
              mainCategory: true,
              migration: {
                colNames: ['value'],
              },
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 5,
                  labelKey: 'nonWoodForestProductsRemovals.total',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 4,
                  type: 'calculated',
                },
                {
                  idx: 1,
                  type: 'placeholder',
                },
              ],
              labelKey: 'nonWoodForestProductsRemovals.total',
              colSpan: 5,
              mainCategory: true,
              variableName: 'totalValue',
              migration: {
                format: {
                  integer: true,
                },
                colNames: ['value'],
                calcFormula: `(
                 nonWoodForestProductsRemovals.product_1 || nonWoodForestProductsRemovals.product_2 || nonWoodForestProductsRemovals.product_3 
                 || nonWoodForestProductsRemovals.product_4 || nonWoodForestProductsRemovals.product_5 || nonWoodForestProductsRemovals.product_6 
                 || nonWoodForestProductsRemovals.product_7 || nonWoodForestProductsRemovals.product_8 || nonWoodForestProductsRemovals.product_9
                 || nonWoodForestProductsRemovals.product_10 || nonWoodForestProductsRemovals.all_other_plant_products || nonWoodForestProductsRemovals.all_other_animal_products
                 ) ? (
                  (nonWoodForestProductsRemovals.product_1 || 0) + (nonWoodForestProductsRemovals.product_2 || 0) + (nonWoodForestProductsRemovals.product_3 || 0)
                  + (nonWoodForestProductsRemovals.product_4 || 0) + (nonWoodForestProductsRemovals.product_5 || 0) + (nonWoodForestProductsRemovals.product_6 || 0)
                  + (nonWoodForestProductsRemovals.product_7 || 0) + (nonWoodForestProductsRemovals.product_8 || 0) + (nonWoodForestProductsRemovals.product_9 || 0)
                  + (nonWoodForestProductsRemovals.product_10 || 0) + (nonWoodForestProductsRemovals.all_other_plant_products || 0) + (nonWoodForestProductsRemovals.all_other_animal_products || 0)
                 ) : null`,
              },
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
        },
        {
          name: 'nonWoodForestProductsRemovalsCurrency',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'nonWoodForestProductsRemovals.currency',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'text',
                },
              ],
              labelKey: 'nonWoodForestProductsRemovals.currency',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: false,
    comments: true,
    introductoryText: false,
    nationalData: true,
  },
  dataExport: {
    included: false,
  },
  migration: {
    anchors: {
      '2020': '7c',
      '2025': '7',
    },
    label: {
      '2020': { key: 'nonWoodForestProductsRemovals.nonWoodForestProductsRemovals' },
      '2025': { key: 'fra.nonWoodForestProductsRemovals.nonWoodForestProductsRemovals2025' },
    },
  },
}
