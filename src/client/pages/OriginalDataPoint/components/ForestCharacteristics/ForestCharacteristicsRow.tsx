import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useOnChangeForestCharacteristics } from 'client/pages/OriginalDataPoint/components/ForestCharacteristics/hooks/useOnChangeForestCharacteristics'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'

import { useNationalClassNameComments } from '../../hooks'

const allowedClass = (nc: ODPNationalClass) => Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const { t } = useTranslation()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestNaturalPercent, forestPlantationPercent, otherPlantedForestPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'forest_charasteristics'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const {
    onChangeForestNaturalPercent,
    onChangeForestPlantationPercent,
    onChangeOtherPlantedForestPercent,
    onPasteForestNaturalPercent,
    onPasteForestPlantationPercent,
    onPasteOtherPlantedForestPercent,
  } = useOnChangeForestCharacteristics({ index })

  const validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validForestCharacteristicsPercentage',
  })

  if (!allowedClass(nationalClass)) {
    return null
  }

  const shouldRenderReviewIndicator = originalDataPoint.id && canEditData
  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>

      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {area && Numbers.format((Number(area) * Number(nationalClass.forestPercent)) / 100)}
      </th>

      <td
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-id={TooltipId.error}
        data-tooltip-content={validationErrorMessage}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={forestNaturalPercent}
          onChange={onChangeForestNaturalPercent}
          onPaste={onPasteForestNaturalPercent}
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
          numberValue={forestPlantationPercent}
          onChange={onChangeForestPlantationPercent}
          onPaste={onPasteForestPlantationPercent}
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
          numberValue={otherPlantedForestPercent}
          onChange={onChangeOtherPlantedForestPercent}
          onPaste={onPasteOtherPlantedForestPercent}
        />
      </td>

      {shouldRenderReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={t('nationalDataPoint.forestCharacteristics')}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'forestCharacteristics')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsRow
