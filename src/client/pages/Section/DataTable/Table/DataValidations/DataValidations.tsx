import './DataValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from 'meta/assessment/table'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useTableHasErrors } from 'client/store/data/validations/tables/hooks/tables'
import { useCycle } from 'client/store/meta/hooks/cycles'
import Icon from 'client/components/Icon'

type Props = {
  table: Table
}

const DataValidations: React.FC<Props> = (props) => {
  const { table } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const hasErrors = useTableHasErrors({ table })
  const historyActive = useHistoryLastApprovedIsActive()

  const disableErrorMessage = table.props.disableErrorMessage?.[cycle.uuid] === true
  if (!hasErrors || historyActive) {
    return null
  }

  const prefix = disableErrorMessage ? '' : t('page.assessmentSection.dataTableHasErrors')
  const message = `${prefix}${t('page.assessmentSection.hoverCellToSeeDetails')}`

  return (
    <div className="data-validations">
      <Icon className="icon-middle" name="alert" />

      {message}
    </div>
  )
}

export default DataValidations
