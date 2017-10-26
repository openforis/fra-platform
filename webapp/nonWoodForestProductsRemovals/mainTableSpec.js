import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../traditionalTable/aggregate'
import { formatInteger } from '../utils/numberFormat'

const fillerCell = () => ({
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell"/>
})

const lastFillerOrRow = () => ({
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell" style={{borderRight: '1px solid #d5d5d5'}}/>
})

const productRow = idx => [
  {
    type: 'readOnly',
    jsx: <td key={idx} className="fra-table__header-cell-sub">
      #{idx}
    </td>
  },
  {type: 'textInput', minWidth: 240},
  {type: 'textInput', minWidth: 240},
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
    jsx: <td className="fra-table__row-header-continued-with-fillers">
      {heading}
    </td>
  },
  ...R.times(fillerCell, 4),
  {type: 'integerInput'},
  lastFillerOrRow()
]

const totalRow = i18n => {

  const renderSum = ({tableData}) =>
    <td key="" className="fra-table__calculated-cell">
      {totalSumFormatted(tableData, 5, R.range(0, 13), formatInteger)}
    </td>

  return [
    {
      type: 'readOnly',
      jsx: <td className="fra-table__row-header-continued-with-fillers">
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

export default i18n => ({
  name: 'nonWoodForestProductsRemovals',
  header: <thead>
  <tr>
    <td className="fra-table__header-cell"/>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.nameOfProduct')}</td>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.keySpecies')}</td>
    <td className="fra-table__header-cell-right">{i18n.t('nonWoodForestProductsRemovals.quantity')}</td>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.unit')}</td>
    <td className="fra-table__header-cell-right">{i18n.t('nonWoodForestProductsRemovals.value')}</td>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.category')}</td>
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
