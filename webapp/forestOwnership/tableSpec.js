import React from 'react'
import R from 'ramda'
import { separateDecimalThousandsWithSpaces } from '../utils/numberFormat'

const createInputRow = (rowHeader, cname = 'fra-table__header-cell') => [
  {type: 'readOnly', jsx: <td key="protection" className={`${cname}`}>{rowHeader}</td>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

const totalForestArea = (tableData, columnIdx) =>
  R.reduce((sum, rowIdx) => {
      const value = tableData[rowIdx][columnIdx]
      if (!R.isNil(value))
        return sum + value
      else
        return sum
    },
    0,
    [0,4,5]
  )

const totalForestAreaCell = (column) => (props) =>
  <td key="" className="fra-table__aggregate-cell">
    {separateDecimalThousandsWithSpaces(totalForestArea(props.tableData, column))}
  </td>

export default i18n => ({
  name: 'forestOwnership',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestOwnership.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('forestOwnership.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2020</td>
  </tr>
  </thead>,
  rows: [
    createInputRow(i18n.t('forestOwnership.privateOwnership')),
    createInputRow(i18n.t('forestOwnership.ofWhichIndividuals'), 'fra-table__header-cell-sub'),
    createInputRow(i18n.t('forestOwnership.ofWhichPrivateBusinesses'), 'fra-table__header-cell-sub'),
    createInputRow(i18n.t('forestOwnership.ofWhichCommunities'), 'fra-table__header-cell-sub'),
    createInputRow(i18n.t('forestOwnership.publicOwnership')),
    createInputRow(i18n.t('forestOwnership.otherOrUnknown')),
    [{type: 'readOnly',
      jsx: <td key=""
               className="fra-table__header-cell">{i18n.t('forestOwnership.totalForestArea')}</td>
    },
      {type: 'custom', render: totalForestAreaCell(1)},
      {type: 'custom', render: totalForestAreaCell(2)},
      {type: 'custom', render: totalForestAreaCell(3)},
      {type: 'custom', render: totalForestAreaCell(4)},
      {type: 'custom', render: totalForestAreaCell(5)}]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
