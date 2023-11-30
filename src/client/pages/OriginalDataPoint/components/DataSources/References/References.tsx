import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Topics } from 'meta/messageCenter'

import { DataCell } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { Props } from 'client/pages/OriginalDataPoint/components/DataSources/References/Props'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'
import { useEditorOptions } from './hooks/useEditorOptions'
import { useOnClose } from './hooks/useOnClose'
import AddFromRepository from './AddFromRepository'

type OnChange = (value?: string) => void

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

  const onChange = useCallback<OnChange>(
    (value) => {
      const dataSourceReferences = Objects.isEmpty(value) ? null : value
      const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )

  return (
    <>
      <DataCell header>{t('nationalDataPoint.references')}</DataCell>
      <DataCell lastCol>
        {disabled && (
          <div className="input-container">
            <MarkdownPreview value={originalDataPoint.dataSourceReferences ?? ''} />
          </div>
        )}

        {!disabled && (
          <>
            <EditorWYSIWYG
              onChange={onChange}
              options={editorOptions}
              value={originalDataPoint.dataSourceReferences ?? ''}
            />
            <AddFromRepository isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </DataCell>

      {reviewIndicator && (
        <DataCell review>
          <ReviewIndicator
            title={t('nationalDataPoint.references')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceReferences')}
          />
        </DataCell>
      )}
    </>
  )
}

export default References
