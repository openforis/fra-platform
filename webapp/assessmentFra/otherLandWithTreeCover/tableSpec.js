import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../../utils/numberFormat'
import { totalSum } from '../../traditionalTable/aggregate'
import { otherLandLessThanOrEqualToExtentOfForestValidator } from '../../traditionalTable/validators'
import { getOtherLandAreaForYear } from '../../../common/extentOfForestHelper'
import { Link } from '../../reusableUiComponents/link'

const mapIndexed = R.addIndex(R.map)
const years = [1990, 2000, 2010, 2015, 2020]
const sumRows = R.range(0, 5)

export default (i18n, extentOfForest, faoStat, countryIso) => {
  const createInputRow = (rowHeader) => [
    {
      type: 'readOnly',
      jsx: <th className="fra-table__category-cell">{rowHeader}</th>
    },
    ...(R.map(() =>
      ({
        type: 'decimalInput'
      }), years))
  ]

  return {
    name: 'otherLandWithTreeCover', // used to uniquely identify table
    header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('otherLandWithTreeCover.categoryHeader')}</th>
      <th className="fra-table__header-cell"
          colSpan={years.length}>{i18n.t('otherLandWithTreeCover.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
      }
    </tr>
    </thead>,
    rows: [
      createInputRow(i18n.t('otherLandWithTreeCover.palms') + ' (a)'),
      createInputRow(i18n.t('otherLandWithTreeCover.treeorchards') + ' (b)'),
      createInputRow(i18n.t('otherLandWithTreeCover.agroforestry') + ' (c)'),
      createInputRow(i18n.t('otherLandWithTreeCover.treesinurbansettings') + ' (d)'),
      createInputRow(i18n.t('otherLandWithTreeCover.other') + ' (e)'),
      [
        {
          type: 'readOnly',
          jsx:
            <th className="fra-table__header-cell-left">
              {i18n.t('otherLandWithTreeCover.total')} (a+b+c+d+e)
            </th>
        },
        ...mapIndexed((year, i) =>
          ({
            type: 'calculated',
            calculateValue: props => totalSum(props.tableData, i + 1, sumRows),
            valueFormatter: formatDecimal,
            validator: otherLandLessThanOrEqualToExtentOfForestValidator(year, extentOfForest, faoStat, sumRows)
          }), years)
      ],
      [
        {
          type: 'readOnly',
          jsx:
            <th className="fra-table__header-cell-left">
              <div className="only-print">
                {i18n.t('otherLandWithTreeCover.otherLandArea')}
              </div>
              <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
                {i18n.t('otherLandWithTreeCover.otherLandArea')}
              </Link>
            </th>
        },
        ...R.map(year =>
          ({
            type: 'calculated',
            calculateValue: props => getOtherLandAreaForYear(extentOfForest, faoStat, year),
            valueFormatter: formatDecimal
          }), years)
      ]
    ],
    valueSlice: {
      columnStart: 1,
      rowEnd: -2
    }
  }
}
