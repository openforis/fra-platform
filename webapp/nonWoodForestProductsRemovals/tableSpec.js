import React from 'react'
import R from 'ramda'

const fillerCell = () => ({
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell"/>
})

const productRow = idx => [
  {
    type: 'readOnly',
    jsx: <td key={idx} className="fra-table__header-cell-sub">
      #{idx}
    </td>
  },
  {type: 'textInput', minWidth: 240},
  {type: 'textInput'},
  {type: 'integerInput'},
  {type: 'textInput'},
  {type: 'integerInput'},
  {
    type: 'textSelect',
    localizationPrefix: 'nonWoodForestProductsRemovals',
      options: [
          {name: 'food'},
          {name: 'fodder'},
          {name: 'rawMaterialForMedicine'},
          {name: 'rawMaterialForColorants'},
          {name: 'rawMaterialForUtensils'},
          {name: 'ornamentalPlants'},
          {name: 'exudates'},
          {name: 'otherPlantProducts'},
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
    jsx: <td className="fra-table__header-cell">
      {heading}
    </td>
  },
  ...R.times(fillerCell,4),
  {type: 'integerInput'},
  fillerCell()
]

const totalRow = i18n => {
  const total = tableData =>
    R.reduce((sum, row) => {
        const value = tableData[row][5]
        if (!R.isNil(value))
          return sum + value
        else
          return sum
      },
      0,
      R.range(0, 13)
    )
  const renderSum = ({tableData}) =>
    <td key="" className="fra-table__aggregate-cell">
      {total(tableData)}
    </td>

  return [
    {
      type: 'readOnly',
      jsx: <td className="fra-table__header-cell">
        {i18n.t('nonWoodForestProductsRemovals.total')}
      </td>
    },
    ...R.times(fillerCell, 4),
    {
      type: 'custom',
      render: renderSum
    },
    fillerCell()
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
    ...R.map(productRow,R.range(1, 11)),
    otherProductsRow(i18n.t('nonWoodForestProductsRemovals.allOtherPlantProducts')),
    otherProductsRow(i18n.t('nonWoodForestProductsRemovals.allOtherAnimalProducts')),
    totalRow(i18n)
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
