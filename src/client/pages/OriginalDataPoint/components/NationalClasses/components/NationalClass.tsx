import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPs, OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'
import InputText from 'client/components/Inputs/InputText'
import TextArea from 'client/components/Inputs/TextArea'
import ReviewIndicator from 'client/components/ReviewIndicator'
// import { useNationalClassNameComments } from 'client/pages/OriginalDataPoint/hooks'
import { useCanEditData } from 'client/pages/OriginalDataPoint/hooks/useCanEditData'

import { useOnChangeNationalClass } from './hooks/onChangeNationalClass'

type Props = {
  index: number
  originalDataPoint: OriginalDataPoint
}

const NationalClass: React.FC<Props> = (props) => {
  const { index, originalDataPoint } = props
  const { nationalClasses } = originalDataPoint

  const i18n = useTranslation()
  const { print } = useIsPrintRoute()
  const canEditData = useCanEditData(originalDataPoint)

  const nationalClass = nationalClasses[index]
  const { name, definition, uuid, placeHolder } = nationalClass
  const lastRow = canEditData && !print ? placeHolder : index === nationalClasses.length - (print ? 1 : 2)
  // TODO next pr
  // const target = [originalDataPoint.id, 'class', `${uuid}`, 'definition'] as string[]
  // const classNameRowComments = useNationalClassNameComments(target)

  const nationalClassValidation = ODPs.validateNationalClass(originalDataPoint, index)
  const error = !nationalClassValidation.validClassName

  const { onChangeDefinition, onChangeName, onDeleteNationalClass, onPasteDefinition, onPasteName } =
    useOnChangeNationalClass({ index })

  if (!canEditData && placeHolder) {
    return null
  }

  return (
    <>
      <DataCell error={error} lastRow={lastRow}>
        <InputText
          disabled={!canEditData}
          onChange={onChangeName}
          onPaste={onPasteName}
          placeholder={placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''}
          value={name ?? ''}
        />
      </DataCell>

      <DataCell lastCol lastRow={lastRow}>
        <TextArea
          disabled={!canEditData}
          onChange={onChangeDefinition}
          onPaste={onPasteDefinition}
          value={definition ?? ''}
        />
      </DataCell>

      {canEditData && !placeHolder && (
        <>
          <DataCell className="odp__grid__cell-delete" review>
            {!placeHolder && (
              <button className="btn-s btn-link-destructive" onClick={onDeleteNationalClass} type="button">
                <Icon className="icon-no-margin" name="trash-simple" />
              </button>
            )}
          </DataCell>
          <DataCell review>
            <ReviewIndicator
              subtitle={i18n.t('nationalDataPoint.nationalDataPoint')}
              title={name}
              topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'definition')}
            />
          </DataCell>
        </>
      )}
    </>
  )
}

export default NationalClass
