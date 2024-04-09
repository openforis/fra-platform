import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { TooltipId } from 'meta/tooltip'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useCanEditCycleData } from 'client/store/user'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG, { EditorValidators } from 'client/components/EditorWYSIWYG'

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

  const editor = useCanEditCycleData()

  const validationError = useMemo<string>(() => {
    if (editor && !EditorValidators.links(originalDataPoint.dataSourceReferences ?? ''))
      return t('generalValidation.invalidLink')
    return ''
  }, [editor, originalDataPoint.dataSourceReferences, t])

  return (
    <DataGrid className="odp__section description" gridTemplateColumns={`1fr${canEditData ? ' 32px' : ''}`}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead description-title__label">{t('review.comments')}</h3>

        {canEditData && (
          <Button
            inverse={!open}
            label={open ? t('description.done') : t('description.edit')}
            onClick={() => setOpen(!open)}
            size={ButtonSize.xs}
          />
        )}
      </DataCell>
      {canEditData && <div />}

      <DataRow actions={actions}>
        <DataCell
          className={classNames({ 'validation-error': validationError.length > 0 })}
          data-tooltip-content={validationError}
          data-tooltip-id={TooltipId.error}
          editable={open}
          lastCol
          lastRow
          noBorder={!open}
        >
          <div className={classNames('description__editor-container', { editable: open })}>
            <EditorWYSIWYG disabled={!open} onChange={updateDescription} value={originalDataPoint.description} />
          </div>
        </DataCell>
      </DataRow>
    </DataGrid>
  )
}

export default Comments
