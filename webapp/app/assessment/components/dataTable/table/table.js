import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import {
  copyTableAsHtml,
  updatePastedValues
} from '@webapp/app/assessment/fra/components/tableWithOdp/components/copyPasteUtils'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import Row from '@webapp/app/assessment/components/dataTable/table/row'

const Table = props => {

  const {
    assessmentType, sectionName, sectionAnchor, tableName, rows, data,
    copyValues, disabled,
  } = props

  const rowsHeader = rows.filter(row => row.type === 'header')
  const rowsData = rows.filter(row => row.type !== 'header')

  const i18n = useI18n()
  const userInfo = useUserInfo()
  const tableRef = useRef(null)

  return (
    <>
      <ButtonTableExport
        tableRef={tableRef}
        filename={sectionAnchor}
      />

      <table ref={tableRef} className="fra-table">
        <thead>
        {
          rowsHeader.map((row, i) => (
            <tr key={i}>
              {
                row.cols.map((col, j) => (
                  <th key={j} className={col.className} colSpan={col.colSpan} rowSpan={col.rowSpan}>
                    {
                      col.labelKey
                        ? i18n.t(col.labelKey)
                        : col.label
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
        </thead>
        <tbody>
        {
          rowsData.map((row, i) =>
            <Row
              assessmentType={assessmentType}
              key={i}
              sectionName={sectionName}
              tableName={tableName}
              data={data}
              row={row}
              rowIdx={i}
              disabled={disabled}
              pasteUpdate={() => {}}
            />
          )
        }
        </tbody>
        {/*<thead>*/}
        {/*<tr>*/}
        {/*  <th className="fra-table__header-cell-left" rowSpan="2">*/}
        {/*    {categoryHeaderLabel}*/}
        {/*  </th>*/}
        {/*  <th className="fra-table__header-cell" colSpan={fra.length}>*/}
        {/*    <div>*/}

        {/*      {*/}
        {/*        tableHeaderLabel*/}
        {/*      }*/}

        {/*      {*/}
        {/*        copyValues && userInfo &&*/}
        {/*        <button className="fra-table__header-button btn-xs btn-primary no-print"*/}
        {/*                onClick={() => copyTableAsHtml(i18n, fra, rows)}>*/}
        {/*          {i18n.t('tableWithOdp.copyToClipboard')}*/}
        {/*        </button>*/}
        {/*      }*/}
        {/*    </div>*/}
        {/*  </th>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  {*/}
        {/*    fra.map((datum, i) => (*/}
        {/*      <HeaderCell*/}
        {/*        key={i}*/}
        {/*        datum={datum}*/}
        {/*        section={section}*/}
        {/*      />*/}
        {/*    ))*/}
        {/*  }*/}
        {/*</tr>*/}
        {/*</thead>*/}
        {/*<tbody>*/}
        {/*{*/}
        {/*  rows.map((row, i) => (*/}
        {/*    <Row*/}
        {/*      key={i}*/}
        {/*      fra={fra}*/}
        {/*      section={section}*/}
        {/*      row={row}*/}
        {/*      rowIdx={i}*/}
        {/*      disabled={disabled}*/}
        {/*      pasteUpdate={R.partial(updatePastedValues, [R.pluck('field', rows)])}*/}
        {/*    />*/}
        {/*  ))*/}
        {/*}*/}
        {/*</tbody>*/}
      </table>
    </>
  )
}

Table.propTypes = {
  // metadata
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  //data
  data: PropTypes.array.isRequired,

  // boolean checks
  copyValues: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Table
