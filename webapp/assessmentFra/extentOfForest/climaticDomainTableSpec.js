import React from 'react'
import * as R from 'ramda'
import { formatDecimal } from '../../utils/numberFormat'

const climaticDomainInputRow = (categoryHeader, previouslyKnownValue) =>
  [
    {
      type: 'readOnly',
      jsx: <th className="fra-table__category-cell">{categoryHeader}</th>
    },
    {
      type: 'readOnly',
      jsx: <td className="fra-table__calculated-cell">{formatDecimal(previouslyKnownValue)}</td>
    },
    {
      type: 'decimalInput'
    }
  ]

export default (i18n, climaticDomainPercents) => ({
  name: 'climaticDomain',
  header: <thead>
    <tr>
      <th className="fra-table__header-cell">{i18n.t('climaticDomain.climaticDomain')}</th>
      <th className="fra-table__header-cell">{i18n.t('climaticDomain.percentOfForestArea2015')}</th>
      <th className="fra-table__header-cell">{i18n.t('climaticDomain.percentOfForestArea2015Override')}</th>
    </tr>
  </thead>,
  rows: [
    climaticDomainInputRow(i18n.t('climaticDomain.boreal'), R.path(['boreal'], climaticDomainPercents)),
    climaticDomainInputRow(i18n.t('climaticDomain.temperate'), R.path(['temperate'], climaticDomainPercents)),
    climaticDomainInputRow(i18n.t('climaticDomain.subtropical'), R.path(['subtropical'], climaticDomainPercents)),
    climaticDomainInputRow(i18n.t('climaticDomain.tropical'), R.path(['tropical'], climaticDomainPercents))
  ],
  valueSlice: {columnStart: 2}
})
