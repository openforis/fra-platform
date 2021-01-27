import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import { saveDraft } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

type OwnProps = {
  canEditData?: boolean
  odp?: any
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof CommentsEditor.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'CommentsEditor' implicitly has type 'any' because... Remove this comment to see the full error message
const CommentsEditor = (props: Props) => {
  const { canEditData, odp } = props
  const [open, setOpen] = useState(false)
  const textareaRef = useRef(null)
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  let descriptionEditor = useRef(null)
  const initCKeditor = () => {
    if (odp.odpId) {
      descriptionEditor.current.setData(odp.description, { callback: () => initCkeditorChangeListener() })
    } else {
      initCkeditorChangeListener()
    }
  }
  const initCkeditorChangeListener = () => {
    descriptionEditor.current.on('change', (evt: any) => {
      dispatch(
        saveDraft(countryIso, {
          ...odp,
          description: evt.editor.getData(),
        })
      )
    })
  }
  useEffect(() => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CKEDITOR'.
    descriptionEditor.current = CKEDITOR.replace(textareaRef.current, ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    descriptionEditor.current.on('instanceReady', () => initCKeditor())
    return () => {
      descriptionEditor.current.destroy(false)
      descriptionEditor = null
    }
  }, [])
  useEffect(() => {
    if (open) {
      descriptionEditor.current.focus()
    }
  }, [open])
  return (
    <div>
      <div className="fra-description__header-row">
        <h3 className="subhead fra-description__header">{(i18n as any).t('review.comments')}</h3>
        {canEditData && (
          <div className="fra-description__link" onClick={() => setOpen(!open)}>
            {open ? (i18n as any).t('description.done') : (i18n as any).t('description.edit')}
          </div>
        )}
      </div>

      <div className="cke_wrapper" style={{ display: open ? 'block' : 'none' }}>
        <textarea ref={textareaRef} />
      </div>

      {odp.description && (
        <div
          className="fra-description__preview"
          style={{ display: open ? 'none' : 'block' }}
          dangerouslySetInnerHTML={{ __html: odp.description }}
        />
      )}
    </div>
  )
}
CommentsEditor.defaultProps = {
  canEditData: true,
}
export default CommentsEditor
