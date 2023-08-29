import './DataValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useTableHasErrors } from 'client/store/data'
import Icon from 'client/components/Icon'

type Props = {
  table: Table
}

const DataValidations: React.FC<Props> = (props) => {
  const { table } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const hasErrors = useTableHasErrors({ table })

  const disableErrorMessage = table.props.disableErrorMessage?.[cycle.uuid] === true

  if (!hasErrors) {
    return null
  }

  const prefix = disableErrorMessage ? '' : t('page.assessmentSection.dataTableHasErrors')
  const message = `${prefix}${t('page.assessmentSection.hoverCellToSeeDetails')}`

  return (
    <div className="data-validations">
      <Icon name="alert" className="icon-middle" />

      {message}
    </div>
  )
}

export default DataValidations
