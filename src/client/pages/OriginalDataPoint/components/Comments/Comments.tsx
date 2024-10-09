import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
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
  const actions = useCommentsActions()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (open && isDataLocked) {
      setOpen(!isDataLocked)
    }
  }, [isDataLocked, open])

  const withActions = useMemo(() => actions.length > 0, [actions])

  return (
    <DataGrid className="odp__section description" withActions={withActions}>
      <DataRow actions={actions}>
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
      </DataRow>

      <DataCell editable={open} gridColumn={canEditData ? `1/-1` : undefined} lastCol lastRow noBorder={!open}>
        <div className={classNames('description__editor-container', { editable: open })}>
          <EditorWYSIWYG
            disabled={!open}
            onChange={updateDescription}
            repository
            value={originalDataPoint.description}
          />
        </div>
      </DataCell>
    </DataGrid>
  )
}

export default Comments
