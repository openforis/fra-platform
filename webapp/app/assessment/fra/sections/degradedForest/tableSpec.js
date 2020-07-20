import React from 'react'

export default i18n => ({
  name: 'degradedForest',
  header: <thead/>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__header-cell-left" colSpan="2">
          {i18n.t('degradedForest.doesYourCountryMonitor')}
        </th>
      },
      {type: 'yesNoSelect'},
      {
        type: 'readOnly',
        jsx: <td className="fra-table__hidden-cell"/>
      }
    ],
    [
      {type: 'readOnly', jsx: <th className="fra-table__category-cell" rowSpan="2" style={{minWidth: '72px'}}>{i18n.t('degradedForest.ifYes')}</th>},
      {type: 'readOnly', jsx: <th className="fra-table__category-cell">{i18n.t('degradedForest.whatIsDefinition')}</th>},
      {type: 'verticallyGrowingTextInput', minWidth: 350},
    ],
    [
      {type: 'readOnly', jsx: <th className="fra-table__category-cell">{i18n.t('degradedForest.howMonitored')}</th>},
      {type: 'verticallyGrowingTextInput', minWidth: 350},
      {
        type: 'readOnly',
        jsx: <td className="fra-table__hidden-cell"/>
      }
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
