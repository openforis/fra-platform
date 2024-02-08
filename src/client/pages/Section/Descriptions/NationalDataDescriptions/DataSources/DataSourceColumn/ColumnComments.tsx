import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { datasourceValidators } from './datasourceValidators'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
  lastRow: boolean
}

const ColumnComments: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange, lastRow } = props
  const { t } = useTranslation()
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)

  const validationError = useMemo(() => {
    return datasourceValidators.comment(dataSourceValue.comments)
  }, [dataSourceValue.comments])

  return (
    <DataCell
      lastCol
      lastRow={lastRow}
      data-tooltip-id={TooltipId.error}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      className={classNames({
        'validation-error': validationError,
      })}
    >
      <TextArea disabled={disabled} onChange={_onChange} value={dataSourceValue.comments} />
    </DataCell>
  )
}
export default ColumnComments
