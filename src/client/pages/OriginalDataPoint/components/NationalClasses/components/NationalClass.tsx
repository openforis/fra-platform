import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPs, OriginalDataPoint } from 'meta/assessment'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell, DataRow } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'
import TextArea from 'client/components/Inputs/TextArea'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'
// import { useNationalClassNameComments } from 'client/pages/OriginalDataPoint/hooks'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

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
  const { name, definition, placeHolder } = nationalClass

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const canEditData = useIsEditODPEnabled()
  const actions = useRowActions({ index, originalDataPoint })
  const { onChangeDefinition, onChangeName, onPasteDefinition, onPasteName } = useOnChangeNationalClass({ index })

  const displayHistory = useODPDisplayHistory()

  const lastRow = canEditData && !print ? placeHolder : index === nationalClasses.length - (print ? 1 : 2)
  // TODO next pr
  // const target = [originalDataPoint.id, 'class', `${uuid}`, 'definition'] as string[]
  // const classNameRowComments = useNationalClassNameComments(target)

  const nationalClassValidation = ODPs.validateNationalClass(originalDataPoint, index)
  const error = !nationalClassValidation.validClassName

  if (!canEditData && placeHolder) {
    return null
  }

  return (
    <DataRow actions={actions}>
      <DataCell error={error} lastRow={lastRow}>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['nationalClasses', index, 'name']}
          />
        ) : (
          <InputText
            disabled={!canEditData}
            onChange={onChangeName}
            onPaste={onPasteName}
            placeholder={placeHolder && index === 0 ? t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''}
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
            disabled={!canEditData}
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
