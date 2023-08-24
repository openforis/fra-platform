import './DataValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from 'meta/assessment'

import { useTableHasErrors } from 'client/store/data'
import Icon from 'client/components/Icon'

type Props = {
  table: Table
}

const DataValidations: React.FC<Props> = (props) => {
  const { table } = props

  const { t } = useTranslation()
  const hasErrors = useTableHasErrors({ table })

  // const disableErrorMessage = table.props.disableErrorMessage?.[cycle.uuid] === true

  if (!hasErrors) {
    return null
  }

  return (
    <div className="data-validations">
      <Icon name="alert" className="icon-middle" />

      {t('page.assessmentSection.dataTableHasErrors')}
    </div>
  )
}

export default DataValidations
