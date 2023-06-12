import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import DataColumn from 'client/components/DataGrid/DataColumn'
import Icon from 'client/components/Icon'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'

import { datasourceValidators } from './datasourceValidators'

interface DataSourceReferenceColumnProps {
  dataSourceValue: DataSource
  placeholder: boolean
  disabled: boolean
  onChange: (key: string, value: Record<string, string>) => void
}

const ColumnReference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSourceValue, placeholder, disabled, onChange } = props
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
    <DataColumn
      data-tooltip-id={TooltipId.error}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      className={classNames('data-source-column', {
        'validation-error': validationError,
      })}
    >
      <div className="data-source__text-area-wrapper">
        {!disabled && !toggleLinkField && (
          <VerticallyGrowingTextField
            disabled={disabled}
            onChange={(event) => _onChange('text', event.target.value)}
            value={dataSourceValue.reference?.text ?? ''}
          />
        )}

        {!disabled && toggleLinkField && (
          <VerticallyGrowingTextField
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
      </div>
    </DataColumn>
  )
}

export default ColumnReference
