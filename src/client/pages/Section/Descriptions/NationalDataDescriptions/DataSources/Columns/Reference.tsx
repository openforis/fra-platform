import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CommentableDescriptionName, DataSource, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

import { useOnChange } from './hook/useOnChange'
import { datasourceValidators } from './datasourceValidators'

type Props = {
  dataSource: DataSource
  lastRow: boolean
  sectionName: SectionName
}

const Reference: React.FC<Props> = (props: Props) => {
  const { dataSource, lastRow, sectionName } = props

  const { t } = useTranslation()
  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })
  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange = useCallback(
    (value: string) => {
      onChange('reference', value)
    },
    [onChange]
  )

  const validationError = useMemo(() => {
    return datasourceValidators.referenceText(dataSource.reference)
  }, [dataSource.reference])

  return (
    <DataCell
      className={classNames('data-source__column-reference', { 'validation-error': validationError })}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      data-tooltip-id={TooltipId.error}
      editable={editable}
      lastRow={lastRow}
    >
      <EditorWYSIWYGLinks disabled={!editable} onChange={_onChange} repository value={dataSource.reference ?? ''} />
    </DataCell>
  )
}

export default Reference
