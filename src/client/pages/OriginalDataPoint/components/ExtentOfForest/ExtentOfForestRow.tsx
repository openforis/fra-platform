import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ODPs } from 'meta/assessment/odps'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter/topics'
import { Objects } from 'utils/objects'

import { useCycle } from 'client/store/meta/hooks/cycles'
import DiffText from 'client/components/DiffText'
import InputNumber from 'client/components/Inputs/InputNumber'
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
import { useOtherLandPercentChange } from './hooks/useOtherLandPercentChange'

type Props = {
  canEditData: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

const columns: Columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal', precision: 3 },
  { name: 'otherWoodedLandPercent', type: 'decimal', precision: 3 },
  { name: 'otherLandPercent' as keyof ODPNationalClass, type: 'decimal', precision: 3 },
]

const ExtentOfForestRow: React.FC<Props> = (props) => {
  const { canEditData, index, originalDataPoint } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  const nationalClass = originalDataPoint.nationalClasses[index]
  const { area, forestPercent, name, otherWoodedLandPercent, uuid } = nationalClass
  const target = [originalDataPoint.id, 'class', `${uuid}`, 'value'] as Array<string>
  const classNameRowComments = useNationalClassNameComments(target)

  const displayHistory = useODPDisplayHistory()

  const areaErrorTooltip = useNationalClassErrorTooltip({
    field: 'area',
    nationalClassUuid: uuid,
    nationalDataPointUuid: originalDataPoint.uuid,
  })
  const percentageErrorTooltip = useNationalClassErrorTooltip({
    field: 'extentOfForestPercentage',
    nationalClassUuid: uuid,
    nationalDataPointUuid: originalDataPoint.uuid,
  })

  const otherLandPercent = ODPs.calculateNationalClassOtherLandPercent(nationalClass)

  const otherLandPercentChange = useOtherLandPercentChange({ nationalClassIndex: index, otherLandPercent })

  const _onPaste = useOnPaste({
    columns,
    index,
  })
  const updateOriginalDataField = useUpdateOriginalDataField()
  const updateOriginalData = useUpdateOriginalData()

  const showReviewIndicator = useShowReviewIndicator()

  return (
    <tr className={classNameRowComments}>
      <th className="fra-table__category-cell">
        {displayHistory ? (
          <ODPDiffText originalDataPoint={originalDataPoint} path={['nationalClasses', index, 'name']} />
        ) : (
          name
        )}
      </th>
      <td
        className={classNames(`fra-table__cell fra-table__divider`, {
          'validation-error': !Objects.isEmpty(areaErrorTooltip),
        })}
        data-tooltip-content={areaErrorTooltip?.content}
        data-tooltip-id={areaErrorTooltip?.id}
      >
        {displayHistory ? (
          <ODPDiffText
            className="odp-data-input-diff"
            format="decimal"
            originalDataPoint={originalDataPoint}
            path={['nationalClasses', index, 'area']}
          />
        ) : (
          <InputNumber
            disabled={!canEditData}
            onChange={(event): void => {
              const { value } = event.target
              const updateProps = { field: columns[0].name, value, index }
              updateOriginalDataField(updateProps)
            }}
            onPaste={(event): void => {
              const odp = _onPaste({ event, colIndex: 0 })
              updateOriginalData(odp)
            }}
            value={area}
          />
        )}
      </td>

      <td
        className={classNames('fra-table__cell', { 'validation-error': !Objects.isEmpty(percentageErrorTooltip) })}
        data-tooltip-content={percentageErrorTooltip?.content}
        data-tooltip-id={percentageErrorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <ODPDiffText
              format="percent"
              originalDataPoint={originalDataPoint}
              path={['nationalClasses', index, 'forestPercent']}
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
            value={forestPercent}
          />
        )}
      </td>

      <td
        className={classNames('fra-table__cell', { 'validation-error': !Objects.isEmpty(percentageErrorTooltip) })}
        data-tooltip-content={percentageErrorTooltip?.content}
        data-tooltip-id={percentageErrorTooltip?.id}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <ODPDiffText
              format="percent"
              originalDataPoint={originalDataPoint}
              path={['nationalClasses', index, 'otherWoodedLandPercent']}
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
            value={otherWoodedLandPercent}
          />
        )}
      </td>

      <td className="fra-table__calculated-cell">
        {displayHistory ? (
          <div className="odp-calculated-percent-diff">
            <DiffText changes={otherLandPercentChange} />
            <span>%</span>
          </div>
        ) : (
          <>
            <span>{otherLandPercent}</span>
            <span style={{ marginLeft: '8px' }}>%</span>
          </>
        )}
      </td>

      {showReviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            subtitle={t(`nationalDataPoint.forestCategoriesLabel${cycle.name !== '2020' ? '2025' : ''}`)}
            title={name}
            topicKey={Topics.getOdpClassReviewTopicKey(originalDataPoint.id, uuid, 'extentOfForest')}
          />
        </td>
      )}
    </tr>
  )
}

export default ExtentOfForestRow
