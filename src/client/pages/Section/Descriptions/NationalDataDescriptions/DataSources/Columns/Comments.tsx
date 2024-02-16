import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'
import { datasourceValidators } from './datasourceValidators'

type Props = {
  dataSource: DataSource
  disabled: boolean
  lastRow: boolean
  sectionName: SectionName
}

const Comments: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, lastRow, sectionName } = props

  const { t } = useTranslation()

  const onChange = useOnChange({ sectionName, dataSource })
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)

  const validationError = useMemo(() => {
    return datasourceValidators.comment(dataSource.comments)
  }, [dataSource.comments])

  return (
    <DataCell
      className={classNames({ 'validation-error': validationError })}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      data-tooltip-id={TooltipId.error}
      editable={!disabled}
      lastCol
      lastRow={lastRow}
    >
      <TextArea disabled={disabled} onChange={_onChange} value={dataSource.comments} />
    </DataCell>
  )
}
export default Comments
