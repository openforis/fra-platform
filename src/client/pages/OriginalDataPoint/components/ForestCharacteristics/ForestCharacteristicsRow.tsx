import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'
import { useUpdateOriginalDataField } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalDataField'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'

const columns: Columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestNaturalPercent', type: 'decimal', precision: 3 },
  { name: 'forestPlantationPercent', type: 'decimal', precision: 3 },
  { name: 'otherPlantedForestPercent', type: 'decimal', precision: 3 },
]

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

  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  const validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validForestCharacteristicsPercentage',
  })

  const showReviewIndicator = useShowReviewIndicator(originalDataPoint, 'forestCharacteristics')

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
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={forestNaturalPercent}
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
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={forestPlantationPercent}
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

      <td
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        <PercentInput
          disabled={!canEditData}
          numberValue={otherPlantedForestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target
            const updateProps = { field: columns[3].name, index, precision: columns[3].precision, value }
            updateOriginalDataField(updateProps)
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            const odp = _onPaste({ event, colIndex: 3 })
            updateOriginalData(odp)
          }}
        />
      </td>

      {showReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={t('nationalDataPoint.forestCharacteristics')}
            title={name}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'forestCharacteristics')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsRow
