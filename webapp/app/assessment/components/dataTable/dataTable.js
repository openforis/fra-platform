import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Table from '@webapp/app/assessment/components/dataTable/table'

const DataTable = props => {
  const { assessmentType, sectionName, sectionAnchor, tableSpec, copyValues, disabled } = props

  const { name: tableName, rows, getSectionData, odp } = tableSpec

  const data = useSelector(getSectionData(assessmentType, sectionName, tableName))

  if (!data) {
    return null
  }

  return (
    <>
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          {odp ? (
            <div />
          ) : (
            <Table
              assessmentType={assessmentType}
              sectionName={sectionName}
              sectionAnchor={sectionAnchor}
              tableName={tableName}
              rows={rows}
              data={data}
              copyValues={copyValues}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </>
  )
}

DataTable.propTypes = {
  // metadata
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableSpec: PropTypes.object.isRequired,

  // boolean checks
  copyValues: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default DataTable
