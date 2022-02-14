import React from 'react'
import { Col, Table, TableSection } from '@meta/assessment'
import { useTranslation } from 'react-i18next'

type TablePlaceholderProps = {
  table: Table
}

const TablePlaceholder: React.FC<TablePlaceholderProps> = (props: TablePlaceholderProps) => {
  const { table } = props
  return (
    <table border={1}>
      {table.rows.map((row) => (
        <tr key={row.uuid}>
          {row.cols.map((col: Col) => {
            if (col.props.colType === 'header')
              return (
                <th key={`${row.uuid}_${col.uuid}`} aria-colspan={col.props.colSpan} aria-rowspan={col.props.rowSpan}>
                  rowId: {col.rowId} | colId: {col.id}
                </th>
              )
            return (
              <td key={`${row.uuid}_${col.uuid}`} aria-colspan={col.props.colSpan} aria-rowspan={col.props.rowSpan}>
                rowId: {col.rowId} | colId: {col.id}
              </td>
            )
          })}
        </tr>
      ))}
    </table>
  )
}

type Props = {
  tableSection: TableSection
}

const TableSectionComponent: React.FC<Props> = (props: Props) => {
  const { tableSection } = props
  const showTitle = true
  const printView = false // todo
  const sectionName = 'extentOfForest'
  const { i18n } = useTranslation()
  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && printView && (
        <h2 className="title only-print">
          {/* {`${printOnlyTablesView ? '' : `${sectionAnchor} `}${i18n.t(`${sectionName}.${sectionName}`)}`} */}
          {`${i18n.t(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}
      {tableSection.tables.map((table) => (
        <>
          <TablePlaceholder table={table} />
          <br />
          <div className="page-break" />
        </>
      ))}
    </div>
  )
}

export default TableSectionComponent
