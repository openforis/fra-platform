import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import ReviewIndicator from 'client/components/ReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useShowReviewIndicator } from '../hooks/useShowReviewIndicator'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const References: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const editorOptions = useMemo(() => ({ buttons: ['link'], statusbar: false }), [])

  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)

  const updateOriginalDataPoint = useUpdateDataSources()

  const { t } = useTranslation()

  return (
    <tr>
      <th className="fra-table__header-cell-left">{t('nationalDataPoint.references')}</th>
      <td className="fra-table__cell-left odp__data-source-input-column">
        {disabled && (
          <div className="vgtf__textarea">
            <MarkdownPreview value={originalDataPoint.dataSourceReferences ?? ''} />
          </div>
        )}

        {!disabled && (
          <EditorWYSIWYG
            onChange={(value) => {
              const dataSourceReferences = Objects.isEmpty(value) ? null : value
              const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
              updateOriginalDataPoint(originalDataPointUpdate)
            }}
            options={editorOptions}
            value={originalDataPoint.dataSourceReferences ?? ''}
          />
        )}
      </td>
      {reviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={t('nationalDataPoint.references')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceReferences')}
          />
        </td>
      )}
    </tr>
  )
}

export default References
