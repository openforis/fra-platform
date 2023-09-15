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
import { useNationalClassValidations } from 'client/pages/OriginalDataPoint/hooks/useNationalClassValidations'

import { useNationalClassNameComments } from '../../hooks'
import { useUpdateOriginalData } from '../hooks/useUpdateOriginalData'

const columns = [{ name: 'forestNaturalForestOfWhichPrimaryForestPercent', type: 'decimal' }]

const allowedClass = (nc: ODPNationalClass) => {
  return nc.forestNaturalPercent !== null && Number(nc.forestNaturalPercent) > 0 && Number(nc.forestPercent) > 0
}

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsNaturallyRegeneratingRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
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

  const validationErrorMessage = useNationalClassValidations({
    index,
    originalDataPoint,
    variable: 'validPrimaryForest',
  })

  const updateOriginalData = useUpdateOriginalData()

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
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-id={TooltipId.error}
        data-tooltip-content={validationErrorMessage}
      >
        <PercentInput
          disabled={!canEditData || isZeroOrNullPrimaryForest}
          numberValue={isZeroOrNullPrimaryForest ? 0 : forestNaturalForestOfWhichPrimaryForestPercent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const field = 'forestNaturalForestOfWhichPrimaryForestPercent'
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
