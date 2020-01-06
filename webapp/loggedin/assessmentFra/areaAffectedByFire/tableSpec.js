import React from 'react'
import * as R from 'ramda'
import { subCategoryValidator } from '@webapp/traditionalTable/validators'

export const tableProps = {
  areaAffectedByFire: {
    name: 'areaAffectedByFire',
    startYear: 2000,
    endYear: 2017,
  },
  areaAffectedByFirePrint1: {
    name: 'areaAffectedByFirePrint1',
    startYear: 2000,
    endYear: 2008,
  },
  areaAffectedByFirePrint2: {
    name: 'areaAffectedByFirePrint2',
    startYear: 2009,
    endYear: 2017,
  }
}

export default (i18n, tableProp = tableProps.areaAffectedByFire) => {
  const {startYear, endYear, name} = tableProp

  const years = R.range(startYear, endYear + 1)
  const integerInputColumns = R.times(() => ({type: 'decimalInput'}), years.length)

  return {
    name, // used to uniquely identify table
    header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('areaAffectedByFire.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan={years.length}>{i18n.t('areaAffectedByFire.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
      }
    </tr>
    </thead>,
    rows: [
      [{
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('areaAffectedByFire.totalLandAreaAffectedByFire')}
        </th>
      },
        ...integerInputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__subcategory-cell">{i18n.t('areaAffectedByFire.ofWhichForest')}</th>
        },
        ...R.times(() => ({type: 'decimalInput', validator: subCategoryValidator(0, [1])}), years.length)
      ]
    ],
    valueSlice: {
      rowStart: 0,
      rowEnd: undefined,
      columnStart: 1,
      columnEnd: undefined
    }
  }

}

