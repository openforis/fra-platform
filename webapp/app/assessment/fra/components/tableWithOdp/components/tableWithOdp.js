import './tableWithOdp.less'

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import TableHeaderCell from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableHeaderCell'
import TableBodyRow from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyRow'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import {
  copyTableAsHtml,
  updatePastedValues
} from '@webapp/app/assessment/fra/components/tableWithOdp/components/copyPasteUtils'

const TableWithOdp = props => {

  const {
    fra, //TODO rename in data
    rows, section, sectionAnchor,
    copyValues, disabled,
    tableHeaderLabel, categoryHeaderLabel,
  } = props

  const i18n = useI18n()
  const userInfo = useUserInfo()
  const tableRef = useRef(null)

  const dataValues = Object.values(fra)

  return (
    <div className="fra-table__container table-with-odp">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport
          tableRef={tableRef}
          filename={sectionAnchor}
        />
        <table ref={tableRef} className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">
              {categoryHeaderLabel}
            </th>
            <th className="fra-table__header-cell" colSpan={dataValues.length}>
              <div>

                {
                  tableHeaderLabel
                }

                {
                  copyValues && userInfo &&
                  <button className="fra-table__header-button btn-xs btn-primary no-print"
                          onClick={() => copyTableAsHtml(i18n, fra, rows)}>
                    {i18n.t('tableWithOdp.copyToClipboard')}
                  </button>
                }
              </div>
            </th>
          </tr>
          <tr>
            {
              dataValues.map((datum, i) => (
                <TableHeaderCell
                  key={i}
                  datum={datum}
                  section={section}
                />
              ))
            }
          </tr>
          </thead>
          <tbody>
          {
            rows.map((row, i) => (
              <TableBodyRow
                key={i}
                fra={fra}
                section={section}
                row={row}
                rowIdx={i}
                disabled={disabled}
                pasteUpdate={R.partial(updatePastedValues, [R.pluck('field', rows)])}
              />
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

TableWithOdp.propTypes = {
  // data
  fra: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,

  // boolean checks
  copyValues: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,

  // labels
  tableHeaderLabel: PropTypes.string.isRequired,
  categoryHeaderLabel: PropTypes.string.isRequired,
}

TableWithOdp.defaultProps = {
  copyValues: true,
  disabled: false,
}

export default TableWithOdp

