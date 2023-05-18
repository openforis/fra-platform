import './DataValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { useTableData } from '@client/store/data'
import { useNodeValueValidation } from '@client/store/ui/assessmentSection'
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
  const nodeUpdate = useNodeValueValidation({ tableName })
  const data = useTableData({ table })
  const hasErrors = TableDatas.hasErrors({ countryIso, tableName, data })

  if (!hasErrors) {
    return null
  }

  return (
    <div className="data-validations">
      <Icon name="alert" />
      {nodeUpdate ? (
        nodeUpdate.value.validation.messages.map(({ key, params }) => (
          <div key={key} className="msg">
            {t<string>(key, params)}
          </div>
        ))
      ) : (
        <div className="msg">{t<string>('page.assessmentSection.dataTableHasErrors')}</div>
      )}
    </div>
  )
}

export default DataValidations
