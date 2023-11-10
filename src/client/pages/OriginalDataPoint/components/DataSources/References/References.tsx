import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { Jodit } from 'jodit/types/jodit'
import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import ReviewIndicator from 'client/components/ReviewIndicator'

import AddFromRepository from './AddFromRepository'

type ButtonType = Jodit['options']['buttons'][0]

type ReferencesProps = {
  originalDataPoint: OriginalDataPoint
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
  disabled: boolean
  reviewIndicator: boolean
}

const References: React.FC<ReferencesProps> = (props) => {
  const { originalDataPoint, updateOriginalDataPoint, reviewIndicator, disabled } = props

  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCustomButtonClick = () => {
    // Open the custom modal
    setIsModalOpen(true)
  }

  const closeModal = (x: string) => {
    // Close the custom modal
    setIsModalOpen(false)

    // TODO: This should go where cursor is
    const dataSourceReferences = Objects.isEmpty(x) ? null : `${originalDataPoint.dataSourceReferences}\n${x}`
    const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
    updateOriginalDataPoint(originalDataPointUpdate)
  }

  const customButton: ButtonType = useMemo(() => {
    return {
      name: t('landing.links.repository'),
      exec: handleCustomButtonClick,
      /* TODO: label: Change or translate */
      tooltip: 'Add links to the repository',
    }
  }, [t])

  const editorOptions = useMemo(() => ({ buttons: ['link', '|', customButton], statusbar: false }), [customButton])

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
            <AddFromRepository isOpen={isModalOpen} onClose={closeModal} />
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
