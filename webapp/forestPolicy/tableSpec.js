import React from 'react'

export default i18n => ({
  name: 'forestPolicy',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestPolicy.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="2">{i18n.t('forestPolicy.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">{i18n.t('forestPolicy.national')}</th>
    <th className="fra-table__header-cell-right">{i18n.t('forestPolicy.subnational')}</th>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">
          {i18n.t('forestPolicy.policies_SFM')}
        </td>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">
          {i18n.t('forestPolicy.legislations_SFM')}
        </td>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">
          {i18n.t('forestPolicy.stakeholder_participation')}
        </td>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">
          {i18n.t('forestPolicy.existence_of_traceability_system')}
        </td>
      },
      {type: 'yesNoSelect'},
      {type: 'yesNoSelect'}
    ],
  ],
  valueSlice: {
    columnStart: 1
  }
})
