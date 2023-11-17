import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Topics } from 'meta/messageCenter'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { Props } from 'client/pages/OriginalDataPoint/components/DataSources/References/Props'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useShowReviewIndicator } from '../hooks/useShowReviewIndicator'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'
import { useEditorOptions } from './hooks/useEditorOptions'
import { useOnClose } from './hooks/useOnClose'
import AddFromRepository from './AddFromRepository'

const References: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editor, setEditor] = useState(null)

  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)

  const onClose = useOnClose({ setIsOpen, setEditor, editor })

  const editorOptions = useEditorOptions({ setIsOpen, setEditor })
  const updateOriginalDataPoint = useUpdateDataSources()

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
