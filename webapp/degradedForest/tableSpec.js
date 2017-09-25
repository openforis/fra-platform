import React from 'react'

export default i18n => ({
  name: 'degradedForest',
  header: <thead/>,
  rows: [
    [
      {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('degradedForest.doesYourCountryMonitor')}</td>},
      {type: 'verticallyGrowingTextInput'}
    ]
  ]
})
