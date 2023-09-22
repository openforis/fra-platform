import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useIsFra2020 } from 'client/hooks/useIsFra2020'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import { useUpdateDescription } from 'client/pages/OriginalDataPoint/components/Comments/hooks/useUpdateDescription'

type Props = {
  canEditData: boolean
}

const CommentsEditor: React.FC<Props> = (props) => {
  const { canEditData } = props
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const originalDataPoint = useOriginalDataPoint()
  const isDataLocked = useIsDataLocked()

  const isFra2020 = useIsFra2020()

  const updateDescription = useUpdateDescription()

  useEffect(() => {
    if (open && isDataLocked) {
      setOpen(!isDataLocked)
    }
  }, [isDataLocked, open])

  return (
    <div className="fra-description__header-row">
      <h3 className="subhead fra-description__header">{t('review.comments')}</h3>
      {canEditData && (
        <span
          role="button"
          aria-label=""
          tabIndex={0}
          className="link fra-description__link no-print"
          onClick={() => setOpen(!open)}
          onKeyDown={() => setOpen(!open)}
        >
          {open ? t('description.done') : t('description.edit')}
        </span>
      )}

      <div className="fra-description__preview">
        {open ? (
          <EditorWYSIWYG value={originalDataPoint.description} onChange={updateDescription} />
        ) : (
          <MarkdownPreview allowImages={isFra2020} value={originalDataPoint.description} />
        )}
      </div>
    </div>
  )
}

export default CommentsEditor
