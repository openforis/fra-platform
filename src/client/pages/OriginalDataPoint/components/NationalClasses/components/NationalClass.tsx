import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Objects } from 'utils/objects'

import { DataCell, DataRow } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'
import TextArea from 'client/components/Inputs/TextArea'
import { TooltipType } from 'client/components/Tooltips/type'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'
// import { useNationalClassNameComments } from 'client/pages/OriginalDataPoint/hooks'
import { useIsEditODPDescriptionEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'
import { useNationalClassErrorTooltip } from 'client/pages/OriginalDataPoint/hooks/useNationalClassErrorTooltip'

import { useOnChangeNationalClass } from './hooks/onChangeNationalClass'
import { useRowActions } from './hooks/useRowActions'

type Props = {
  index: number
  originalDataPoint: OriginalDataPoint
}

const NationalClass: React.FC<Props> = (props) => {
  const { index, originalDataPoint } = props

  const { nationalClasses } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { definition, name, uuid } = nationalClass

  const { t } = useTranslation()
  const canEditDescription = useIsEditODPDescriptionEnabled()
  const actions = useRowActions({ index, originalDataPoint })
  const { onChangeDefinition, onChangeName, onPasteDefinition, onPasteName } = useOnChangeNationalClass({ index })

  const displayHistory = useODPDisplayHistory()

  const lastRow = index === nationalClasses.length - 1
  // TODO next pr
  // const target = [originalDataPoint.id, 'class', `${uuid}`, 'definition'] as string[]
  // const classNameRowComments = useNationalClassNameComments(target)

  const errorTooltip = useNationalClassErrorTooltip({
    field: 'name',
    nationalClassUuid: uuid,
    nationalDataPointUuid: originalDataPoint.uuid,
  })
  const error = !Objects.isEmpty(errorTooltip)
  const tooltip = error ? { content: errorTooltip.content, type: TooltipType.error } : undefined

  return (
    <DataRow actions={actions}>
      <DataCell className={classNames({ 'validation-error': error })} error={error} lastRow={lastRow} tooltip={tooltip}>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['nationalClasses', index, 'name']}
          />
        ) : (
          <InputText
            disabled={!canEditDescription}
            onChange={onChangeName}
            onPaste={onPasteName}
            placeholder={index === 0 ? t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''}
            value={name ?? ''}
          />
        )}
      </DataCell>

      <DataCell lastCol lastRow={lastRow}>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['nationalClasses', index, 'definition']}
          />
        ) : (
          <TextArea
            disabled={!canEditDescription}
            onChange={onChangeDefinition}
            onPaste={onPasteDefinition}
            value={definition ?? ''}
          />
        )}
      </DataCell>
    </DataRow>
  )
}

export default NationalClass
