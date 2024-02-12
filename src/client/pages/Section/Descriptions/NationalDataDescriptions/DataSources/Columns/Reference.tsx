import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

import { useOnChange } from './hook/useOnChange'
import { datasourceValidators } from './datasourceValidators'

interface DataSourceReferenceColumnProps {
  dataSource: DataSource
  disabled: boolean
  lastRow: boolean
  sectionName: SectionName
}

const Reference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSource, disabled, lastRow, sectionName } = props

  const { t } = useTranslation()
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
      editable={!disabled}
      lastRow={lastRow}
    >
      <EditorWYSIWYGLinks disabled={disabled} onChange={_onChange} repository value={dataSource.reference ?? ''} />
    </DataCell>
  )
}

export default Reference
