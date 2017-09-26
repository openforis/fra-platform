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
      {type: 'yesNoSelect'},
      {
        type: 'readOnly',
        jsx: <td className="fra-table__hidden-cell"/>
      }
    ],
    [
      {type: 'readOnly', jsx: <td className="fra-table__header-cell" rowSpan="2">{i18n.t('degradedForest.ifYes')}</td>},
      {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('degradedForest.whatIsDefinition')}</td>},
      {type: 'verticallyGrowingTextInput', minWidth: 350},
    ],
    [
      {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('degradedForest.howMonitored')}</td>},
      {type: 'verticallyGrowingTextInput', minWidth: 350},
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
