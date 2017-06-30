import React from 'react'
import R from 'ramda'

const integerInputColumns = R.times(() => ({type: 'integerInput'}), 4)

const netChange = (expansion, deforestation) => !isNaN(expansion) && !isNaN(deforestation) ? expansion - deforestation : null

const netChangeCell = (column) => (props) =>
  <td key="" className="fra-table__text-readonly-cell">
    {netChange(props.tableData[0][column], props.tableData[3][column])}
  </td>

export default {
  name: 'forestAreaChange', // used to uniquely identify table
  header: <thead>
  <tr>
    <td className="fra-table__header-cell"/>
    <td className="fra-table__header-cell">1990-2000</td>
    <td className="fra-table__header-cell">2000-2010</td>
    <td className="fra-table__header-cell">2010-2015</td>
    <td className="fra-table__header-cell">2015-2020</td>
  </tr>
  </thead>,
  rows: [
    [{type: 'readOnly', jsx: <td key="expansion" className="fra-table__header-cell">Forest expansion (a)</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__text-readonly-cell">...of which afforestation</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__text-readonly-cell">...of which natural expansion</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">Deforestation (b)</td>},
      ...integerInputColumns
    ],
    [
      {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">Forest area net change</td>},
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
}
