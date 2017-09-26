import React from 'react'

export default i18n => ({
  name: 'degradedForest',
  header: <thead/>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell" colSpan="2">
          {i18n.t('degradedForest.doesYourCountryMonitor')}
        </td>
      },
      {type: 'verticallyGrowingTextInput'}
    ],
    [
      {type: 'readOnly', jsx: <td className="fra-table__header-cell" rowSpan="2">{i18n.t('degradedForest.ifYes')}</td>},
      {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('degradedForest.whatIsDefinition')}</td>},
      {type: 'verticallyGrowingTextInput'},
    ],
    [
      {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('degradedForest.howMonitored')}</td>},
      {type: 'verticallyGrowingTextInput'},
    ]
  ]
})
