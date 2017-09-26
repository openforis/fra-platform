import React from 'react'
import * as R from 'ramda'

const integerInputColumns = R.times(() => ({type: 'integerInput'}), 9)

const fillerCell = {
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell"/>
}
const lastFillerCell = {
  type: 'readOnly',
  jsx: <td className="fra-table__filler-cell" style={{borderRight: '1px solid #d5d5d5'}}/>
}

const readOnlyColumns = R.pipe(
  R.map(() => fillerCell),
  R.append(lastFillerCell)
)(R.range(1, 9))

export default i18n => ({
  name: 'biomassStockTotal', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('biomassStock.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="9">{i18n.t('biomassStock.totalTableHeader')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2016</td>
    <td className="fra-table__header-cell-right">2017</td>
    <td className="fra-table__header-cell-right">2018</td>
    <td className="fra-table__header-cell-right">2019</td>
    <td className="fra-table__header-cell-right">2020</td>
  </tr>
  </thead>,
  rows: [
    [{
      type: 'readOnly',
      jsx: <td key="forest" className="fra-table__row-header-continued-with-fillers">{i18n.t('fraClass.forest')}</td>
    },
      ...readOnlyColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="forest_above_ground_total"
               className="fra-table__header-cell-sub">{i18n.t('biomassStock.aboveGround')}</td>
    },
      ...integerInputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="forest_below_ground_total"
               className="fra-table__header-cell-sub">{i18n.t('biomassStock.belowGround')}</td>
    },
      ...integerInputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="forest_deadwood_total"
               className="fra-table__header-cell-sub">{i18n.t('biomassStock.deadWood')}</td>
    },
      ...integerInputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="other_wooded_land" className="fra-table__row-header-continued-with-fillers">{i18n.t('fraClass.otherWoodedLand')}</td>
    },
      ...readOnlyColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="other_wooded_land_above_ground_total"
               className="fra-table__header-cell-sub">{i18n.t('biomassStock.aboveGround')}</td>
    },
      ...integerInputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="other_wooded_land_below_ground_total"
               className="fra-table__header-cell-sub">{i18n.t('biomassStock.belowGround')}</td>
    },
      ...integerInputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="other_wooded_land_deadwood_total"
               className="fra-table__header-cell-sub">{i18n.t('biomassStock.deadWood')}</td>
    },
      ...integerInputColumns
    ],
  ],
  valueSlice: {
    columnStart: 1
  }
})
