import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CommentableDescriptionName, DataSource, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'
import { datasourceValidators } from './datasourceValidators'

type Props = {
  dataSource: DataSource
  lastRow: boolean
  sectionName: SectionName
}

const Comments: React.FC<Props> = (props: Props) => {
  const { dataSource, lastRow, sectionName } = props

  const { t } = useTranslation()

  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })
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
      editable={editable}
      lastCol
      lastRow={lastRow}
    >
      <TextArea disabled={!editable} onChange={_onChange} value={dataSource.comments} />
    </DataCell>
  )
}
export default Comments
