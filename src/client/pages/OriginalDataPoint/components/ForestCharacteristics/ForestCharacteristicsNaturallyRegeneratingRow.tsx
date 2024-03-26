import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { ODPs } from 'meta/assessment'
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

const columns: Columns = [{ name: 'forestNaturalForestOfWhichPrimaryForestPercent', type: 'decimal' }]

type Props = {
  canEditData: boolean
  index: number
}

const ForestCharacteristicsNaturallyRegeneratingRow: React.FC<Props> = (props) => {
  const { canEditData, index } = props
  const originalDataPoint = useOriginalDataPoint()

  const { i18n } = useTranslation()

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
  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  if (!ODPs.hasNaturallyRegenerating(nationalClass)) {
    return null
  }

  const isZeroOrNullPrimaryForest = ofWhichPrimary === null || Numbers.eq(ofWhichPrimary, 0)

  const shouldRenderReviewIndicator = originalDataPoint.id && canEditData
  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">{name}</th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">{Numbers.format(ofWhichPrimary)}</th>
      <td
        className={classNames(`fra-table__cell`, {
          error: Boolean(validationErrorMessage),
        })}
        data-tooltip-content={validationErrorMessage}
        data-tooltip-id={TooltipId.error}
      >
        <PercentInput
          disabled={!canEditData || isZeroOrNullPrimaryForest}
          numberValue={isZeroOrNullPrimaryForest ? 0 : forestNaturalForestOfWhichPrimaryForestPercent}
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

      {shouldRenderReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={i18n.t('nationalDataPoint.naturallyRegeneratingForest')}
            title={name}
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
