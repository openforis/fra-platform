import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useCycle } from 'client/store/assessment'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import ThousandSeparatedDecimalInput from 'client/components/ThousandSeparatedDecimalInput'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'

import { useNationalClassNameComments } from '../../hooks'
import { useOnChangeExtentOfForest } from './hooks/useOnChangeExtentOfForest'

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
  nationalClassValidation: NationalClassValidation
}

const ExtentOfForestRow: React.FC<Props> = (props) => {
  const { canEditData, index, nationalClassValidation, originalDataPoint } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  const nationalClass = originalDataPoint.nationalClasses[index]
  const { name, area, forestPercent, otherWoodedLandPercent, uuid } = nationalClass
  const target = [originalDataPoint.id, 'class', `${uuid}`, 'value'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  let otherLand = null

  const validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validExtentOfForestPercentage',
  })

  if (!Objects.isEmpty(forestPercent) || !Objects.isEmpty(otherWoodedLandPercent)) {
    otherLand = Numbers.format(Numbers.sub(100, Numbers.add(forestPercent ?? 0, otherWoodedLandPercent ?? 0)))
  }

  const {
    onChangeArea,
    onChangeForestPercent,
    onChangeOtherWoodedLandPercent,
    onPasteArea,
    onPasteForestPercent,
    onPasteOtherWoodedLandPercent,
  } = useOnChangeExtentOfForest({ index })

  const shouldRenderReviewIndicator = originalDataPoint.id && canEditData
  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <td
        className={classNames(`fra-table__cell fra-table__divider`, {
          error: !nationalClassValidation.validArea,
        })}
      >
        <ThousandSeparatedDecimalInput
          disabled={!canEditData}
          numberValue={area}
          onChange={onChangeArea}
          onPaste={onPasteArea}
        />
      </td>

      <td
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-id={TooltipId.error}
        data-tooltip-content={validationErrorMessage}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={forestPercent}
          onChange={onChangeForestPercent}
          onPaste={onPasteForestPercent}
        />
      </td>

      <td
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-id={TooltipId.error}
        data-tooltip-content={validationErrorMessage}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={otherWoodedLandPercent}
          onChange={onChangeOtherWoodedLandPercent}
          onPaste={onPasteOtherWoodedLandPercent}
        />
      </td>

      <td className="fra-table__calculated-cell">
        {otherLand}
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>

      {shouldRenderReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={t(`nationalDataPoint.forestCategoriesLabel${cycle.name === '2025' ? '2025' : ''}`)}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'extentOfForest')}
          />
        </td>
      )}
    </tr>
  )
}

export default ExtentOfForestRow
