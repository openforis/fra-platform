import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass, ODPs, OriginalDataPoint } from 'meta/assessment'
import { SectionNames } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import DiffText from 'client/components/DiffText'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'
import { useUpdateOriginalDataField } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalDataField'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'
import { usePlantationForestPercentAndAreaChange } from './hooks/usePlantationForestPercentAndAreaChange'

const allowedClass = (nc: ODPNationalClass) =>
  nc.forestPlantationPercent !== null && Number(nc.forestPlantationPercent) > 0 && Number(nc.forestPercent) > 0

const columns: Columns = [{ name: 'forestPlantationIntroducedPercent', type: 'decimal', precision: 3 }]

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint, index } = props

  const { i18n } = useTranslation()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, forestPlantationIntroducedPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'plantation_forest_introduced'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const plantationIntroduced = ODPs.calculateNationalClassPlantationForestPercentArea(nationalClass)

  const displayHistory = useODPDisplayHistory()

  let validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validForestPlantationIntroducedPercent',
  })
  validationErrorMessage = displayHistory ? null : validationErrorMessage

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
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <DiffText changes={changes?.forestPlantationIntroducedPercent} />
            <span>%</span>
          </div>
        ) : (
          <PercentInput
            disabled={!canEditData || isZeroOrNullPlantationIntroduced}
            numberValue={forestPlantationIntroducedPercent}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              const updateProps = { field: columns[0].name, index, precision: columns[0].precision, value }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
              const updatedODP = _onPaste({ event, colIndex: 0 })
              updateOriginalData(updatedODP)
            }}
          />
        )}
      </td>

      {showReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={i18n.t('nationalDataPoint.plantationForest')}
            title={name}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'plantationForestIntroduced')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow
