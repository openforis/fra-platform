import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useIsDisabled } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useIsDisabled'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useShowReviewIndicator'
import { useEditorOptions } from 'client/pages/OriginalDataPoint/components/DataSources/References/hooks/useEditorOptions'

import AddFromRepository from './AddFromRepository'

type Props = {
  originalDataPoint: OriginalDataPoint
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
}

const References: React.FC<Props> = (props: Props) => {
  const { originalDataPoint, updateOriginalDataPoint } = props
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)

  const onClose = () => {
    setIsOpen(false)
  }

  const editorOptions = useEditorOptions({ setIsOpen })

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
          <>
            <EditorWYSIWYG
              onChange={(value) => {
                const dataSourceReferences = Objects.isEmpty(value) ? null : value
                const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
                updateOriginalDataPoint(originalDataPointUpdate)
              }}
              options={editorOptions}
              value={originalDataPoint.dataSourceReferences ?? ''}
            />
            <AddFromRepository isOpen={isOpen} onClose={onClose} />
          </>
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
