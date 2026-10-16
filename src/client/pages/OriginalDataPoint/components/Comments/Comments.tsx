import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPCommentsDiffView from 'client/pages/OriginalDataPoint/components/ODPCommentsDiffView/ODPCommentsDiffView'
import { useIsEditODPDescriptionEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

import { useUpdateComment } from './hooks/useUpdateDescription'
import { useValidationErrors } from './hooks/useValidationErrors'
import { useCommentsActions } from './useCommentsActions'

type Props = {
  field: OriginalDataPointCommentKey
}

const Comments: React.FC<Props> = (props) => {
  const { field } = props

  const { t } = useTranslation()
  const originalDataPoint = useOriginalDataPoint()
  const isDataLocked = useIsDataLocked()
  const updateComment = useUpdateComment({ field })
  const actions = useCommentsActions({ field })
  const canEditData = useIsEditODPDescriptionEnabled()
  const [open, setOpen] = useState<boolean>(false)
  const displayHistory = useODPDisplayHistory()
  const validationErrors = useValidationErrors({ field })

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
              onClick={(): void => setOpen(!open)}
              size={ButtonSize.xs}
            />
          )}
        </DataCell>
      </DataRow>

      <DataCell editable={open} gridColumn={canEditData ? `1/-1` : undefined} lastCol lastRow noBorder={!open}>
        {displayHistory ? (
          <ODPCommentsDiffView field={field} />
        ) : (
          <div className={classNames('description__editor-container', { editable: open })}>
            <EditorWYSIWYG
              disabled={!open}
              onChange={updateComment}
              repository
              validationErrors={validationErrors}
              value={originalDataPoint.comments?.[field] ?? ''}
            />
          </div>
        )}
      </DataCell>
    </DataGrid>
  )
}

export default Comments
