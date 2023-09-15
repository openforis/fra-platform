import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'

import { useNationalClassNameComments } from '../../hooks'
import { useUpdateOriginalData } from '../hooks/useUpdateOriginalData'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestNaturalPercent', type: 'decimal' },
  { name: 'forestPlantationPercent', type: 'decimal' },
  { name: 'otherPlantedForestPercent', type: 'decimal' },
]

const allowedClass = (nc: ODPNationalClass) => Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestNaturalPercent, forestPlantationPercent, otherPlantedForestPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'forest_charasteristics'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validForestCharacteristicsPercentage',
  })
  const updateOriginalData = useUpdateOriginalData()

  if (!allowedClass(nationalClass)) {
    return null
  }

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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'forestNaturalPercent'
            const { value } = event.target
            updateOriginalData({ field, value, index, originalDataPoint })
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 1,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'forestPlantationPercent'
            const { value } = event.target
            updateOriginalData({ field, value, index, originalDataPoint })
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 2,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'otherPlantedForestPercent'
            const { value } = event.target
            updateOriginalData({ field, value, index, originalDataPoint })
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 3,
                rowIndex: index,
                columns,
                allowedClass,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      {originalDataPoint.id && canEditData && (
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
