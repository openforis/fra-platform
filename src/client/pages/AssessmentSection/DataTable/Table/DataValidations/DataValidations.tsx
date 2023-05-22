import './DataValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Table } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { useNodeValueValidation, useTableData } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

type Props = {
  table: Table
}

// @ts-ignore
const translateIfKey = (t: any, text: any) => {
  // Assuming that a 'key' is a string
  if (typeof text === 'string') {
    // Try to translate text, if it isn't a key, translation will return the same text
    return t(text)
  }
  // In case text is an array (like subcategories), translate each item
  if (Array.isArray(text)) {
    return `(${text.map((item: any) => translateIfKey(t, item)).join(', ')})`
  }
  // Return original text if it isn't a key or an array
  return text
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
            {t<string>(
              key,
              params && Object.fromEntries(Object.entries(params).map(([k, v]) => [k, translateIfKey(t, v)]))
            )}
          </div>
        ))
      ) : (
        <div className="msg">{t<string>('page.assessmentSection.dataTableHasErrors')}</div>
      )}
    </div>
  )
}

export default DataValidations
