import React from 'react'
import TraditionalTable from '../../../traditionalTable/traditionalTable'

const TableIndicatorAgency = ({i18n, countryIso, tableSpecName, disabled}) => {
  const tableSpec = {
    name: tableSpecName,
    header: <thead/>,
    disableReviewComments: true,
    rows: [[
      {
        type: 'readOnly',
        jsx: <td className="fra-secondary-table__heading-cell">
          {i18n.t('sustainableDevelopment.nameOfAgencyResponsible')}
        </td>
      },
      {type: 'textInput'}
    ]],
    valueSlice: {
      columnStart: 1
    }
  }

  return <div className="sdg__responsible-agency-table">
    <TraditionalTable
      tableSpec={tableSpec}
      countryIso={countryIso}
      disabled={disabled}/>
  </div>
}

export default TableIndicatorAgency
