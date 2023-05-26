import './DataValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { useTableData } from '@client/store/data'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

type Props = {
  table: Table
}

const DataValidations: React.FC<Props> = (props) => {
  const { table } = props
  const tableName = table.props.name

  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const data = useTableData({ table })

  const hasErrors = TableDatas.hasErrors({ countryIso, tableName, data })

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
