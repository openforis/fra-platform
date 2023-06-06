import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPNationalClass } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'
import { Topics } from 'meta/messageCenter'

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
  nationalClassValidation: NationalClassValidation
}

const ForestCharacteristicsPlantationRow: React.FC<Props> = (props) => {
  const { canEditData, index, nationalClassValidation } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestPercent, forestPlantationPercent, forestPlantationIntroducedPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'plantation_forest_introduced'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const plantationIntroduced = area ? Numbers.mul(area, Numbers.div(Numbers.mul(forestPlantationPercent, forestPercent), 10000)) : null

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
          error: !nationalClassValidation.validForestPlantationIntroducedPercent,
        })}
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
            subtitle={i18n.t('nationalDataPoint.plantationForest')}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'plantationForestIntroduced')}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsPlantationRow
