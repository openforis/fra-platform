import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useCountryIso } from 'client/hooks'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'

type Props = {
  canEditData: boolean
}

const CommentsEditor: React.FC<Props> = (props) => {
  const { canEditData } = props
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const originalDataPoint = useOriginalDataPoint()
  const assessment = useAssessment()
  const cycle = useCycle()
  const isDataLocked = useIsDataLocked()

  const onChange = useCallback(
    (content: string) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPoint({
          countryIso,
          cycleName: cycle.name,
          assessmentName: assessment.props.name,
          originalDataPoint: {
            ...originalDataPoint,
            description: content,
          },
        })
      )
    },
    [assessment.props.name, countryIso, cycle.name, dispatch, originalDataPoint]
  )
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
          <EditorWYSIWYG value={originalDataPoint.description} onChange={onChange} />
        ) : (
          <MarkdownPreview value={originalDataPoint.description} />
        )}
      </div>
    </div>
  )
}

export default CommentsEditor
