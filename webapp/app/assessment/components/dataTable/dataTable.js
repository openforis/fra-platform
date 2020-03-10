import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Table from '@webapp/app/assessment/components/dataTable/table'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const DataTable = props => {
  const {
    assessmentType, sectionName, sectionAnchor, tableSpec,
    copyValues, disabled,
  } = props

  const { name: tableName, rows } = tableSpec

  const data = useSelector(AssessmentState.getSectionData(assessmentType, sectionName, tableName))

  if (!data) {
    return null
  }

  return (
    <>
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <Table
            sectionName={sectionName}
            sectionAnchor={sectionAnchor}
            tableName={tableName}
            rows={rows}
            data={data}
            copyValues={copyValues}
            disabled={disabled}
          />
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
