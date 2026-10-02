import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ODPs } from 'meta/assessment/odps'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter/topics'
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
import { useNationalClassForestAreaChange } from './hooks/useNationalClassForestAreaChange'

const columns: Columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestNaturalPercent', type: 'decimal', precision: 3 },
  { name: 'forestPlantationPercent', type: 'decimal', precision: 3 },
  { name: 'otherPlantedForestPercent', type: 'decimal', precision: 3 },
]

const allowedClass = (nc: ODPNationalClass): boolean => Number(nc.forestPercent) > 0

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const { t } = useTranslation()

  const { id, nationalClasses } = originalDataPoint
  const nationalClass = nationalClasses[index]
  const { forestNaturalPercent, forestPlantationPercent, name, otherPlantedForestPercent, uuid } = nationalClass
  const target = [id, 'class', `${uuid}`, 'forest_charasteristics'] as Array<string>
  const classNameRowComments = useNationalClassNameComments(target)

  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  const displayHistory = useODPDisplayHistory()

  const errorTooltip = useNationalClassErrorTooltip({
    field: 'forestCharacteristicsPercentage',
    nationalClassUuid: uuid,
    nationalDataPointUuid: originalDataPoint.uuid,
  })

  const nationalClassForestArea = ODPs.calculateNationalClassForestArea(nationalClass)
  const nationalClassForestAreaChange = useNationalClassForestAreaChange({
    nationalClassForestArea,
    nationalClassIndex: index,
  })

  const showReviewIndicator = useShowReviewIndicator(SectionNames.forestCharacteristics)

  if (!allowedClass(nationalClass)) {
    return null
  }

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
        {displayHistory ? <DiffText changes={nationalClassForestAreaChange} /> : nationalClassForestArea}
      </th>

      <td
        className={classNames('fra-table__cell', { 'validation-error': !Objects.isEmpty(errorTooltip) })}
        data-tooltip-content={errorTooltip?.content}
        data-tooltip-id={errorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <ODPDiffText
              format="percent"
              originalDataPoint={originalDataPoint}
              path={['nationalClasses', index, 'forestNaturalPercent']}
            />
            <span>%</span>
          </div>
        ) : (
          <InputPercent
            disabled={!canEditData}
            onChange={(event): void => {
              const { value } = event.target
              const updateProps = { field: columns[1].name, index, precision: columns[1].precision, value }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event): void => {
              const odp = _onPaste({ event, colIndex: 1 })
              updateOriginalData(odp)
            }}
            value={forestNaturalPercent}
          />
        )}
      </td>

      <td
        className={classNames('fra-table__cell', { 'validation-error': !Objects.isEmpty(errorTooltip) })}
        data-tooltip-content={errorTooltip?.content}
        data-tooltip-id={errorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <ODPDiffText
              format="percent"
              originalDataPoint={originalDataPoint}
              path={['nationalClasses', index, 'forestPlantationPercent']}
            />
            <span>%</span>
          </div>
        ) : (
          <InputPercent
            disabled={!canEditData}
            onChange={(event): void => {
              const { value } = event.target
              const updateProps = { field: columns[2].name, index, precision: columns[2].precision, value }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event): void => {
              const odp = _onPaste({ event, colIndex: 2 })
              updateOriginalData(odp)
            }}
            value={forestPlantationPercent}
          />
        )}
      </td>

      <td
        className={classNames('fra-table__cell', { 'validation-error': !Objects.isEmpty(errorTooltip) })}
        data-tooltip-content={errorTooltip?.content}
        data-tooltip-id={errorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <ODPDiffText
              format="percent"
              originalDataPoint={originalDataPoint}
              path={['nationalClasses', index, 'otherPlantedForestPercent']}
            />
            <span>%</span>
          </div>
        ) : (
          <InputPercent
            disabled={!canEditData}
            onChange={(event): void => {
              const { value } = event.target
              const updateProps = { field: columns[3].name, index, precision: columns[3].precision, value }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event): void => {
              const odp = _onPaste({ event, colIndex: 3 })
              updateOriginalData(odp)
            }}
            value={otherPlantedForestPercent}
          />
        )}
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
