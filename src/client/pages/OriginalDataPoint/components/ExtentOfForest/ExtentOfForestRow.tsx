import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import ThousandSeparatedDecimalInput from 'client/components/ThousandSeparatedDecimalInput'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'

import { useNationalClassNameComments } from '../../hooks'
import { useUpdateOriginalData } from '../hooks/useUpdateOriginalData'

const columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
  nationalClassValidation: NationalClassValidation
}

const ExtentOfForestRow: React.FC<Props> = (props) => {
  const { canEditData, index, nationalClassValidation, originalDataPoint } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const assessment = useAssessment()
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

  const updateOriginalData = useUpdateOriginalData()

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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'area'
            const { value } = event.target
            updateOriginalData({ field, value, index, originalDataPoint })
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 0,
                rowIndex: index,
                columns,
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
          numberValue={forestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'forestPercent'
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
          numberValue={otherWoodedLandPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'otherWoodedLandPercent'
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
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
        />
      </td>

      <td className="fra-table__calculated-cell">
        {otherLand}
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>

      {originalDataPoint.id && canEditData && (
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
