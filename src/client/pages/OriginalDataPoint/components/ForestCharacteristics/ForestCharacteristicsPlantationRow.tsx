import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'
import { useUpdateOriginalDataField } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalDataField'
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'

import { useNationalClassNameComments } from '../../hooks'

const allowedClass = (nc: ODPNationalClass) =>
  nc.forestPlantationPercent !== null && Number(nc.forestPlantationPercent) >= 0 && Number(nc.forestPercent) > 0

const columns: Columns = [{ name: 'forestPlantationIntroducedPercent', type: 'decimal' }]

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const originalDataPoint = useOriginalDataPoint()

  const { i18n } = useTranslation()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestPercent, forestPlantationPercent, forestPlantationIntroducedPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'plantation_forest_introduced'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const plantationIntroduced = area
    ? Numbers.mul(area, Numbers.div(Numbers.mul(forestPlantationPercent, forestPercent), 10000))
    : null

  const validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validForestPlantationIntroducedPercent',
  })

  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  if (!allowedClass(nationalClass)) {
    return null
  }

  const isZeroOrNullPlantationIntroduced = plantationIntroduced === null || Numbers.eq(plantationIntroduced, 0)

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">{Numbers.format(plantationIntroduced)}</th>
      <td
        className={classNames('fra-table__cell', {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-id={TooltipId.error}
        data-tooltip-content={validationErrorMessage}
      >
        <PercentInput
          disabled={!canEditData || isZeroOrNullPlantationIntroduced}
          numberValue={forestPlantationIntroducedPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'forestPlantationIntroducedPercent'
            const { value } = event.target
            updateOriginalDataField({ field, value, index })
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            const updatedODP = _onPaste({ event, colIndex: 0 })
            updateOriginalData(updatedODP)
          }}
        />
      </td>

      {originalDataPoint.id && canEditData && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={name}
            subtitle={i18n.t('nationalDataPoint.plantationForest')}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'plantationForestIntroduced')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow
