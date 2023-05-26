import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'
import classNames from 'classnames'

import { ODPNationalClass } from '@meta/assessment'
import { NationalClassValidation } from '@meta/assessment/originalDataPoint/odps/validateODP'
import { Topics } from '@meta/messageCenter'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/ui/originalDataPoint'
import PercentInput from '@client/components/PercentInput'
import ReviewIndicator from '@client/components/ReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'

const columns = [{ name: 'forestNaturalForestOfWhichPrimaryForestPercent', type: 'decimal' }]

const allowedClass = (nc: ODPNationalClass) =>
  nc.forestNaturalPercent !== null && Number(nc.forestNaturalPercent) >= 0 && Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  nationalClassValidation: NationalClassValidation
}

const ForestCharacteristicsNaturallyRegeneratingRow: React.FC<Props> = (props) => {
  const { canEditData, index, nationalClassValidation } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { nationalClasses, id } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { name, area, forestPercent, forestNaturalPercent, forestNaturalForestOfWhichPrimaryForestPercent, uuid } =
    nationalClass
  const target = [id, 'class', `${uuid}`, 'naturally_regenerating_forest_of_which_primary_forest'] as string[]
  const classNameRowComments = useNationalClassNameComments(target)

  const ofWhichPrimary = area
    ? Numbers.mul(area, Numbers.div(Numbers.mul(forestNaturalPercent, forestPercent), 10000))
    : null

  if (!allowedClass(nationalClass)) {
    return null
  }

  const isZeroOrNullPrimaryForest = ofWhichPrimary === null || Numbers.eq(ofWhichPrimary, 0)

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">{Numbers.format(ofWhichPrimary)}</th>
      <td
        className={classNames(`fra-table__cell`, {
          error: !nationalClassValidation.validPrimaryForest,
        })}
      >
        <PercentInput
          disabled={!canEditData || isZeroOrNullPrimaryForest}
          numberValue={isZeroOrNullPrimaryForest ? 0 : forestNaturalForestOfWhichPrimaryForestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              OriginalDataPointActions.updateNationalClass({
                odp: originalDataPoint,
                index,
                field: 'forestNaturalForestOfWhichPrimaryForestPercent',
                prevValue: forestNaturalForestOfWhichPrimaryForestPercent,
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
            subtitle={i18n.t('nationalDataPoint.naturallyRegeneratingForest')}
            topicKey={Topics.getOdpClassReviewTopicKey(
              originalDataPoint.id,
              uuid,
              'naturallyRegeneratingForestoFwhichPrimary'
            )}
          />
        </td>
      )}
    </tr>
  )
}

export default ForestCharacteristicsNaturallyRegeneratingRow
