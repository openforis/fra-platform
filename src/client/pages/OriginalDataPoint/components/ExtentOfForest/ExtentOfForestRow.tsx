import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useCycle } from 'client/store/assessment'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import ThousandSeparatedDecimalInput from 'client/components/ThousandSeparatedDecimalInput'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'
import { useUpdateOriginalDataField } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalDataField'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
  nationalClassValidation: NationalClassValidation
}

const columns: Columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal', precision: 3 },
  { name: 'otherWoodedLandPercent', type: 'decimal', precision: 3 },
  { name: 'otherLandPercent' as keyof ODPNationalClass, type: 'decimal', precision: 3 },
]

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
    otherLand = Numbers.format(Numbers.sub(100, Numbers.add(forestPercent ?? 0, otherWoodedLandPercent ?? 0)), 3)
  }
  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  const showReviewIndicator = useShowReviewIndicator()

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
            const { value } = event.target
            const updateProps = { field: columns[0].name, value, index }
            updateOriginalDataField(updateProps)
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            const odp = _onPaste({ event, colIndex: 0 })
            updateOriginalData(odp)
          }}
        />
      </td>

      <td
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={forestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target
            const updateProps = { field: columns[1].name, index, precision: columns[1].precision, value }
            updateOriginalDataField(updateProps)
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            const odp = _onPaste({ event, colIndex: 1 })
            updateOriginalData(odp)
          }}
        />
      </td>

      <td
        className={classNames('fra-table__cell', { error: Boolean(validationErrorMessage) })}
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={otherWoodedLandPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target
            const updateProps = { field: columns[2].name, index, precision: columns[2].precision, value }
            updateOriginalDataField(updateProps)
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            const odp = _onPaste({ event, colIndex: 2 })
            updateOriginalData(odp)
          }}
        />
      </td>

      <td className="fra-table__calculated-cell">
        <span>{otherLand}</span>
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>

      {showReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={t(`nationalDataPoint.forestCategoriesLabel${cycle.name === '2025' ? '2025' : ''}`)}
            title={name}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'extentOfForest')}
          />
        </td>
      )}
    </tr>
  )
}

export default ExtentOfForestRow
