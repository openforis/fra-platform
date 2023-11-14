import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import ReviewIndicator from 'client/components/ReviewIndicator'

type ReferencesProps = {
  originalDataPoint: OriginalDataPoint
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
  disabled: boolean
  reviewIndicator: boolean
}

const References: React.FC<ReferencesProps> = (props) => {
  const { originalDataPoint, updateOriginalDataPoint, reviewIndicator, disabled } = props
  const editorOptions = useMemo(() => ({ buttons: ['link'], statusbar: false }), [])

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
