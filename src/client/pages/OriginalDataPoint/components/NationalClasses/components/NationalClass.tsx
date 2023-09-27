import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { ODPs, OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import Icon from 'client/components/Icon'
import ReviewIndicator from 'client/components/ReviewIndicator'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'
import { useNationalClassNameComments } from 'client/pages/OriginalDataPoint/hooks'

import { useOnChangeNationalClass } from './hooks/onChangeNationalClass'

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const NationalClass: React.FC<Props> = (props) => {
  const { index, canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const disabled = !canEditData || !year
  const i18n = useTranslation()

  const { print } = useIsPrintRoute()

  const nationalClass = originalDataPoint.nationalClasses[index]
  const { name, definition, uuid, placeHolder } = nationalClass
  const target = [originalDataPoint.id, 'class', `${uuid}`, 'definition'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)
  const nationalClassValidation = ODPs.validateNationalClass(originalDataPoint, index)

  const { onChangeDefinition, onChangeName, onDeleteNationalClass, onPasteDefinition, onPasteName } =
    useOnChangeNationalClass({ index })

  /* placeHolder-rows can't be removed */
  const shouldRenderDeleteButton = !placeHolder && canEditData && !print
  const shouldRenderReviewIndicator = !print && canEditData && !placeHolder && !Objects.isNil(originalDataPoint.id)
  return (
    <tr className={classNameRowComments}>
      <td
        className={classNames(`fra-table__cell-left odp__nc-table__name`, {
          error: !nationalClassValidation.validClassName,
        })}
      >
        <div className="odp__nc-table__input-container">
          {print ? (
            <div className="text-input__readonly-view only-print" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {name || ''}
            </div>
          ) : (
            <input
              className="odp__nc-table__input validation-error-sensitive-field"
              type="text"
              placeholder={
                placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''
              }
              value={name || ''}
              onChange={onChangeName}
              onPaste={onPasteName}
              disabled={disabled}
            />
          )}

          {shouldRenderDeleteButton && (
            <button type="button" className="odp__nc-table__remove" onClick={onDeleteNationalClass}>
              <Icon name="remove" />
            </button>
          )}
        </div>
      </td>

      <td className="fra-table__cell-left odp__nc-table__def">
        <VerticallyGrowingTextField
          value={definition || ''}
          onChange={onChangeDefinition}
          onPaste={onPasteDefinition}
          disabled={print || disabled}
        />
      </td>

      {shouldRenderReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={i18n.t('nationalDataPoint.nationalDataPoint')}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'definition')}
          />
        </td>
      )}
    </tr>
  )
}

export default NationalClass
