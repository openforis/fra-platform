import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ODPs } from 'meta/assessment/odps'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter/topics'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import DiffText from 'client/components/DiffText'
import InputPercent from 'client/components/Inputs/InputPercent'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'
import { useUpdateOriginalDataField } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalDataField'
import { useNationalClassErrorTooltip } from 'client/pages/OriginalDataPoint/hooks/useNationalClassErrorTooltip'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'
import { usePlantationForestPercentAndAreaChange } from './hooks/usePlantationForestPercentAndAreaChange'

const allowedClass = (nc: ODPNationalClass): boolean =>
  nc.forestPlantationPercent !== null && Number(nc.forestPlantationPercent) > 0 && Number(nc.forestPercent) > 0

const columns: Columns = [{ name: 'forestPlantationIntroducedPercent', type: 'decimal', precision: 3 }]

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const { t } = useTranslation()

  const { id, nationalClasses } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { forestPlantationIntroducedPercent, name, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'plantation_forest_introduced'] as Array<string>
  const classNameRowComments = useNationalClassNameComments(target)

  const plantationIntroduced = ODPs.calculateNationalClassPlantationForestPercentArea(nationalClass)

  const displayHistory = useODPDisplayHistory()

  const errorTooltip = useNationalClassErrorTooltip({
    field: 'forestPlantationIntroducedPercentage',
    nationalClassUuid: uuid,
    nationalDataPointUuid: originalDataPoint.uuid,
  })

  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  const showReviewIndicator = useShowReviewIndicator(SectionNames.forestCharacteristics)

  const changes = usePlantationForestPercentAndAreaChange({
    forestPlantationIntroducedPercent,
    nationalClassIndex: index,
    plantationIntroducedArea: plantationIntroduced,
  })

  if (!allowedClass(nationalClass)) {
    return null
  }

  const isZeroOrNullPlantationIntroduced = plantationIntroduced === null || Numbers.eq(plantationIntroduced, 0)

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {displayHistory ? (
          <DiffText changes={changes?.plantationIntroducedArea} />
        ) : (
          Numbers.format(plantationIntroduced)
        )}
      </th>
      <td
        className={classNames('fra-table__cell', { 'validation-error': !Objects.isEmpty(errorTooltip) })}
        data-tooltip-content={errorTooltip?.content}
        data-tooltip-id={errorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <DiffText changes={changes?.forestPlantationIntroducedPercent} />
            <span>%</span>
          </div>
        ) : (
          <InputPercent
            disabled={!canEditData || isZeroOrNullPlantationIntroduced}
            onChange={(event): void => {
              const { value } = event.target
              const updateProps = { field: columns[0].name, index, precision: columns[0].precision, value }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event): void => {
              const updatedODP = _onPaste({ event, colIndex: 0 })
              updateOriginalData(updatedODP)
            }}
            value={forestPlantationIntroducedPercent}
          />
        )}
      </td>

      {showReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={t('nationalDataPoint.plantationForest')}
            title={name}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'plantationForestIntroduced')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow
