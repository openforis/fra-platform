import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { ODP } from '@core/odp'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'
import { saveDraft } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'

type Props = {
  canEditData: boolean
  odp: ODP
}

const CommentsEditor: React.FC<Props> = (props) => {
  const { canEditData, odp } = props
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const [open, setOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  let descriptionEditor = useRef(null)

  const initCkeditorChangeListener = () => {
    descriptionEditor.current.on('change', (event: any) => {
      const odpUpdate = { ...odp, description: event.editor.getData() }
      dispatch(saveDraft(countryIso, odpUpdate))
    })
  }

  const initCKeditor = () => {
    if (odp.odpId) {
      descriptionEditor.current.setData(odp.description, { callback: () => initCkeditorChangeListener() })
    } else {
      initCkeditorChangeListener()
    }
  }

  useEffect(() => {
    // @ts-ignore
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
        <h3 className="subhead fra-description__header">{i18n.t('review.comments')}</h3>
        {canEditData && (
          <div
            className="link fra-description__link"
            onClick={() => setOpen(!open)}
            onKeyDown={() => setOpen(!open)}
            role="button"
            tabIndex={0}
          >
            {open ? i18n.t('description.done') : i18n.t('description.edit')}
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

export default CommentsEditor
