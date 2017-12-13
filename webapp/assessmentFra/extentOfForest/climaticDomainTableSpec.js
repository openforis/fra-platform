import React from 'react'
import { formatDecimal } from '../../utils/numberFormat'

const climaticDomainInputRow = categoryHeader =>
  [
    {
      type: 'readOnly',
      jsx: <th className="fra-table__category-cell">{categoryHeader}</th>
    },
    {
      type: 'calculated',
      calculateValue: props => 0, // placeHolder, let's calculate this later
      valueFormatter: formatDecimal
    },
    {
      type: 'decimalInput'
    }
  ]

export default i18n => ({
  name: 'climaticDomain',
  header: <thead>
    <tr>
      <th className="fra-table__header-cell">{i18n.t('climaticDomain.climaticDomain')}</th>
      <th className="fra-table__header-cell">{i18n.t('climaticDomain.percentOfForestArea2015')}</th>
      <th className="fra-table__header-cell">{i18n.t('climaticDomain.percentOfForestArea2015Override')}</th>
    </tr>
  </thead>,
  rows: [
    climaticDomainInputRow(i18n.t('climaticDomain.boreal')),
    climaticDomainInputRow(i18n.t('climaticDomain.temperate')),
    climaticDomainInputRow(i18n.t('climaticDomain.subTropical')),
    climaticDomainInputRow(i18n.t('climaticDomain.tropical'))
  ],
  valueSlice: {columnStart: 2}
})
