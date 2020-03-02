import React from 'react'

export default i18n => ({
  name: 'forestPolicy',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('forestPolicy.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="2">{i18n.t('forestPolicy.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell">{i18n.t('forestPolicy.national')}</th>
    <th className="fra-table__header-cell">{i18n.t('forestPolicy.subnational')}</th>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('forestPolicy.policiesSFM')}
        </th>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('forestPolicy.legislationsSFM')}
        </th>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('forestPolicy.stakeholderParticipation')}
        </th>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('forestPolicy.existenceOfTraceabilitySystem')}
        </th>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
  ],
  valueSlice: {
    columnStart: 1
  }
})
