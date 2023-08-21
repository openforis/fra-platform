import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import DataColumn from 'client/components/DataGrid/DataColumn'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'

import { datasourceValidators } from './datasourceValidators'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnComments: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props
  const { t } = useTranslation()
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)

  const validationError = useMemo(() => {
    return datasourceValidators.comment(dataSourceValue.comments)
  }, [dataSourceValue.comments])

  return (
    <DataColumn
      data-tooltip-id={TooltipId.error}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      className={classNames('data-source-column', {
        'validation-error': validationError,
      })}
    >
      <div className="data-source__text-area-wrapper">
        <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={dataSourceValue.comments} />
      </div>
    </DataColumn>
  )
}
export default ColumnComments
