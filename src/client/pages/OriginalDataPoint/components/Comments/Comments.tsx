import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'

import { useUpdateDescription } from './hooks/useUpdateDescription'
import { useCommentsActions } from './useCommentsActions'

type Props = {
  canEditData: boolean
}

const Comments: React.FC<Props> = (props) => {
  const { canEditData } = props

  const { t } = useTranslation()
  const originalDataPoint = useOriginalDataPoint()
  const isDataLocked = useIsDataLocked()
  const updateDescription = useUpdateDescription()
  const actions = useCommentsActions({ canEditData })
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (open && isDataLocked) {
      setOpen(!isDataLocked)
    }
  }, [isDataLocked, open])

  return (
    <DataGrid className="odp__section description" gridTemplateColumns={`1fr${canEditData ? ' 32px' : ''}`}>
      <DataCell className="description-title" noBorder>
        <h3 className="subhead description-title__label">{t('review.comments')}</h3>
        {canEditData && (
          <button className="btn-s description-title__btn-edit no-print" onClick={() => setOpen(!open)} type="button">
            {open ? t('description.done') : t('description.edit')}
          </button>
        )}
      </DataCell>
      {canEditData && <div />}

      <DataRow actions={actions}>
        <DataCell editable={open} lastCol lastRow noBorder={!open}>
          <div className={classNames('description__editor-container', { editable: open })}>
            <EditorWYSIWYG disabled={!open} onChange={updateDescription} value={originalDataPoint.description} />
          </div>
        </DataCell>
      </DataRow>
    </DataGrid>
  )
}

export default Comments
