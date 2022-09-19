import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useCountryIso } from '@client/hooks'
import MarkdownEditor from '@client/components/MarkdownEditor'
import MarkdownPreview from '@client/components/MarkdownPreview'

type Props = {
  canEditData: boolean
}

const CommentsEditor: React.FC<Props> = (props) => {
  const { canEditData } = props
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
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
    <div>
      <div className="fra-description__header-row">
        <h3 className="subhead fra-description__header">{i18n.t<string>('review.comments')}</h3>
        {canEditData && (
          <div
            className="link fra-description__link"
            onClick={() => setOpen(!open)}
            onKeyDown={() => setOpen(!open)}
            role="button"
            tabIndex={0}
          >
            {open ? i18n.t<string>('description.done') : i18n.t<string>('description.edit')}
          </div>
        )}
      </div>
      <div className="cke_wrapper" style={{ display: open ? 'block' : 'none' }}>
        <MarkdownEditor value={originalDataPoint.description} onChange={onChange} />
      </div>
      {originalDataPoint.description && (
        <div className="fra-description__preview">
          <MarkdownPreview value={originalDataPoint.description} />
        </div>
      )}
    </div>
  )
}

export default CommentsEditor
