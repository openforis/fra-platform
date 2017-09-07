import React from 'react'
import R from 'ramda'

const integerInputColumns = R.times(() => ({type: 'integerInput'}), 4)

const netChange = (expansion, deforestation) =>
  !R.isNil(expansion) && !R.isNil(deforestation) ? expansion - deforestation : null

const netChangeCell = (column) => (props) =>
  <td key="" className="fra-table__aggregate-cell">
    {netChange(props.tableData[0][column], props.tableData[3][column])}
  </td>

export default i18n => ({
  name: 'forestAreaChange', // used to uniquely identify table
  header: <thead>
  <tr>
    <td className="fra-table__header-cell"/>
    <td className="fra-table__header-cell-right">1990-2000</td>
    <td className="fra-table__header-cell-right">2000-2010</td>
    <td className="fra-table__header-cell-right">2010-2015</td>
    <td className="fra-table__header-cell-right">2015-2020</td>
  </tr>
  </thead>,
  rows: [
    [{type: 'readOnly', jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('forestAreaChange.forestExpansion')}</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell-sub">{i18n.t('forestAreaChange.ofWhichAfforestation')}</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell-sub">{i18n.t('forestAreaChange.ofWhichNaturalExpansion')}</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">{i18n.t('forestAreaChange.deforestation')}</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">{i18n.t('forestAreaChange.forestAreaNetChange')}</td>},
      {type: 'custom', render: netChangeCell(1)},
      {type: 'custom', render: netChangeCell(2)},
      {type: 'custom', render: netChangeCell(3)},
      {type: 'custom', render: netChangeCell(4)}
    ]
  ],
  valueSlice: {
    rowStart: 0,
    rowEnd: -1,
    columnStart: 1,
    columnEnd: undefined
  }
})
