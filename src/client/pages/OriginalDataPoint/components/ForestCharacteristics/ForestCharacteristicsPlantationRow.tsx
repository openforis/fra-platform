import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import PercentInput from 'client/components/PercentInput'
import ReviewIndicator from 'client/components/ReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'

const columns = [{ name: 'forestPlantationIntroducedPercent', type: 'decimal' }]

const allowedClass = (nc: ODPNationalClass) =>
  nc.forestPlantationPercent !== null && Number(nc.forestPlantationPercent) >= 0 && Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const assessment = useAssessment()
  const cycle = useCycle()
  const originalDataPoint = useOriginalDataPoint()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestPercent, forestPlantationPercent, forestPlantationIntroducedPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'plantation_forest_introduced'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const errorMessage = Numbers.greaterThan(forestPlantationIntroducedPercent, 100)
    ? t(`generalValidation.classValueNotGreaterThan`, {
        name: nationalClasses[index].name,
        value: '100%',
      })
    : null

  const plantationIntroduced = area
    ? Numbers.mul(area, Numbers.div(Numbers.mul(forestPlantationPercent, forestPercent), 10000))
    : null

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
          error: Boolean(errorMessage),
        })}
        data-tooltip-id={TooltipId.error}
        data-tooltip-html={errorMessage}
      >
        <PercentInput
          disabled={!canEditData || isZeroOrNullPlantationIntroduced}
          numberValue={isZeroOrNullPlantationIntroduced ? 0 : forestPlantationIntroducedPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'forestPlantationIntroducedPercent',
                prevValue: forestPlantationIntroducedPercent,
                value: event.target.value,
                assessmentName: assessment.props.name,
                cycleName: cycle.name,
              })
            )
          }}
          onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.pasteNationalClass({
                odp: originalDataPoint,
                event,
                colIndex: 0,
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
            subtitle={t('nationalDataPoint.plantationForest')}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'plantationForestIntroduced')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow
