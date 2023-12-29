import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'
import TextArea from 'client/components/Inputs/TextArea'

import { datasourceValidators } from './datasourceValidators'

interface DataSourceReferenceColumnProps {
  dataSourceValue: DataSource
  placeholder: boolean
  disabled: boolean
  onChange: (key: string, value: Record<string, string>) => void
  lastRow: boolean
}

const ColumnReference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSourceValue, placeholder, disabled, onChange, lastRow } = props
  const { t } = useTranslation()

  const [toggleLinkField, setToggleLinkField] = useState(false)

  const _onChange = useCallback(
    (field: string, value: string) => {
      onChange('reference', {
        ...(dataSourceValue.reference ?? {}),
        [field]: value,
      })
    },
    [dataSourceValue.reference, onChange]
  )

  const validationError = useMemo(() => {
    return datasourceValidators.referenceText(dataSourceValue.reference?.text)
  }, [dataSourceValue.reference?.text])

  return (
    <DataCell
      lastRow={lastRow}
      data-tooltip-id={TooltipId.error}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      className={classNames('data-source__column-reference', {
        'validation-error': validationError,
      })}
    >
      {!disabled && !toggleLinkField && (
        <TextArea
          disabled={disabled}
          onChange={(event) => _onChange('text', event.target.value)}
          value={dataSourceValue.reference?.text ?? ''}
        />
      )}

      {!disabled && toggleLinkField && (
        <TextArea
          disabled={disabled}
          onChange={(event) => _onChange('link', event.target.value)}
          value={dataSourceValue.reference?.link ?? ''}
        />
      )}

      {disabled && (
        <span className="text-input__readonly-view">
          {dataSourceValue.reference?.link ? (
            <a href={dataSourceValue.reference?.link} target="_blank" rel="noreferrer">
              {dataSourceValue.reference?.text}
            </a>
          ) : (
            dataSourceValue.reference?.text
          )}
        </span>
      )}

      {!placeholder && !disabled && (
        <button type="button" onClick={() => setToggleLinkField(!toggleLinkField)}>
          {toggleLinkField ? <Icon name="text_fields" /> : <Icon name="insert_link" />}
        </button>
      )}
    </DataCell>
  )
}

export default ColumnReference
