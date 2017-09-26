import React from 'react'

export default i18n => ({
  name: 'degradedForest',
  header: <thead/>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">
          {i18n.t('degradedForest.doesYourCountryMonitor')}
        </td>
      },
      {
        type: 'textSelect',
        localizationPrefix: 'degradedForest',
        options: [
          {name: 'yes'},
          {name: 'no'}
        ]
      },
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell"/>
      }
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
  ],
  valueSlice: {
    columnStart: 1
  }
})
