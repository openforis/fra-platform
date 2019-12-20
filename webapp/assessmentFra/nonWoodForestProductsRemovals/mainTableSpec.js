import React from 'react'
import * as R from 'ramda'
import { totalSumFormatted } from '../../traditionalTable/aggregate'
import { formatInteger } from '@webapp/utils/numberFormat'

const fillerCell = () => ({
  type: 'readOnly',
  jsx: <td className="fra-table__filler"/>
})

const lastFillerOrRow = () => ({
  type: 'readOnly',
  jsx: <td className="fra-table__filler-last"/>
})

const productRow = idx => [
  {
    type: 'readOnly',
    jsx: <th key={idx} className="fra-table__category-cell">
      #{idx}
    </th>
  },
  {type: 'textInput'},
  {type: 'textInput'},
  {type: 'integerInput'},
  {type: 'textInput'},
  {type: 'integerInput'},
  {
    type: 'textSelect',
    localizationPrefix: 'nonWoodForestProductsRemovals',
    options: [
      {name: 'plantProductsSelectHeading', type: 'heading'},
      {name: 'food'},
      {name: 'fodder'},
      {name: 'rawMaterialForMedicine'},
      {name: 'rawMaterialForColorants'},
      {name: 'rawMaterialForUtensils'},
      {name: 'ornamentalPlants'},
      {name: 'exudates'},
      {name: 'otherPlantProducts'},
      {name: 'animalProductsSelectHeading', type: 'heading'},
      {name: 'livingAnimals'},
      {name: 'hidesSkins'},
      {name: 'wildHoney'},
      {name: 'wildMeat'},
      {name: 'animalRawMaterialForMedicine'},
      {name: 'animalRawMaterialForColorants'},
      {name: 'otherEdibleAnimalProducts'},
      {name: 'otherNonEdibleAnimalProducts'}
    ]
  },
]

const otherProductsRow = (heading) => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell-left fra-table__filler-first">
      {heading}
    </th>
  },
  ...R.times(fillerCell, 4),
  {type: 'integerInput'},
  lastFillerOrRow()
]

const totalRow = i18n => {

  const renderSum = ({tableData}) =>
    <td className="fra-table__calculated-cell">
      {totalSumFormatted(tableData, 5, R.range(0, 13), formatInteger)}
    </td>

  return [
    {
      type: 'readOnly',
      jsx: <td className="fra-table__header-cell-left fra-table__filler-first">
        {i18n.t('nonWoodForestProductsRemovals.total')}
      </td>
    },
    ...R.times(fillerCell, 4),
    {
      type: 'custom',
      render: renderSum
    },
    lastFillerOrRow()
  ]
}

export const sectionName = 'nonWoodForestProductsRemovals'

export default i18n => ({
  name: sectionName,
  header: <thead>
  <tr>
    <th className="fra-table__header-cell"/>
    <th className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.nameOfProduct')}</th>
    <th className="fra-table__header-cell fra-table__nwfp-category-cell">{i18n.t('nonWoodForestProductsRemovals.keySpecies')}</th>
    <th className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.quantity')}</th>
    <th className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.unit')}</th>
    <th className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.value')}</th>
    <th className="fra-table__header-cell fra-table__nwfp-category-cell">{i18n.t('nonWoodForestProductsRemovals.category')}</th>
  </tr>
  </thead>,
  rows: [
    ...R.map(productRow, R.range(1, 11)),
    otherProductsRow(i18n.t('nonWoodForestProductsRemovals.allOtherPlantProducts')),
    otherProductsRow(i18n.t('nonWoodForestProductsRemovals.allOtherAnimalProducts')),
    totalRow(i18n)
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
