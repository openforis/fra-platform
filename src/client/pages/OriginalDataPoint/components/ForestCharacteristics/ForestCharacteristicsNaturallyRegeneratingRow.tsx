import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
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
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'
import { useNationalClassErrorTooltip } from 'client/pages/OriginalDataPoint/hooks/useNationalClassErrorTooltip'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'
import { useNaturalForestPercentAndAreaChange } from './hooks/useNaturalForestPercentAndAreaChange'

const columns: Columns = [{ name: 'forestNaturalForestOfWhichPrimaryForestPercent', type: 'decimal', precision: 3 }]

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsNaturallyRegeneratingRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const { t } = useTranslation()

  const { id, nationalClasses } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { forestNaturalForestOfWhichPrimaryForestPercent, name, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'naturally_regenerating_forest_of_which_primary_forest'] as Array<string>
  const classNameRowComments = useNationalClassNameComments(target)

  const ofWhichPrimary = ODPs.calculateNationalClassNaturalForestPercentArea(nationalClass)

  const changes = useNaturalForestPercentAndAreaChange({
    forestNaturalForestOfWhichPrimaryForestPercent,
    nationalClassIndex: index,
    naturalForestPercentArea: ofWhichPrimary,
  })

  const displayHistory = useODPDisplayHistory()

  const errorTooltip = useNationalClassErrorTooltip({
    field: 'primaryForest',
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

  if (!ODPs.hasNaturallyRegenerating(nationalClass)) {
    return null
  }

  const isZeroOrNullPrimaryForest = ofWhichPrimary === null || Numbers.eq(ofWhichPrimary, 0)

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">
        {displayHistory ? (
          <ODPDiffText originalDataPoint={originalDataPoint} path={['nationalClasses', index, 'name']} />
        ) : (
          name
        )}
      </th>
      <th className="fra-table__calculated-sub-cell fra-table__divider">
        {displayHistory ? <DiffText changes={changes?.naturalForestPercentArea} /> : Numbers.format(ofWhichPrimary)}
      </th>
      <td
        className={classNames(`fra-table__cell`, { 'validation-error': !Objects.isEmpty(errorTooltip) })}
        data-tooltip-content={errorTooltip?.content}
        data-tooltip-id={errorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <DiffText changes={changes?.naturalForestPercent} />
            <span>%</span>
          </div>
        ) : (
          <InputPercent
            disabled={!canEditData || isZeroOrNullPrimaryForest}
            onChange={(event): void => {
              const { value } = event.target
              const updateProps = { field: columns[0].name, index, precision: columns[0].precision, value }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event): void => {
              const odp = _onPaste({ event, colIndex: 0 })
              updateOriginalData(odp)
            }}
            value={isZeroOrNullPrimaryForest ? 0 : forestNaturalForestOfWhichPrimaryForestPercent}
          />
        )}
      </td>

      {showReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={t('nationalDataPoint.naturallyRegeneratingForest')}
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
