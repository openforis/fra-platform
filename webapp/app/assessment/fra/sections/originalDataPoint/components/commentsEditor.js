import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import { saveDraft } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

const CommentsEditor = props => {
  const { canEditData, odp } = props
  const [open, setOpen] = useState(false)
  const textareaRef = useRef(null)
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()

  let descriptionEditor = useRef(null)

  const initCKeditor = () => {
    if (odp.odpId) {
      descriptionEditor.current.setData(
        odp.description,
        { callback: () => initCkeditorChangeListener() })
    } else {
      initCkeditorChangeListener()
    }
  }

  const initCkeditorChangeListener = () => {
    descriptionEditor.current.on('change', (evt) => {
      dispatch(saveDraft(countryIso,
        {
          ...odp,
          description: evt.editor.getData()
        }
      ))
    })
  }

  useEffect(() => {
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

  return <div>
    <div className="fra-description__header-row">
      <h3 className="subhead fra-description__header">
        {i18n.t('review.comments')}
      </h3>
      {
        canEditData &&
        <div className="fra-description__link" onClick={() => setOpen(!open)}>
          {open ? i18n.t('description.done') : i18n.t('description.edit')}
        </div>
      }
    </div>

    <div className="cke_wrapper" style={{ display: open ? 'block' : 'none' }}>
      <textarea ref={textareaRef}/>
    </div>

    {
      odp.description &&
      <div
        className="fra-description__preview"
        style={{ display: open ? 'none' : 'block' }}
        dangerouslySetInnerHTML={{ __html: odp.description }}
      />
    }

  </div>
}

CommentsEditor.defaultProps = {
  canEditData: true
}

CommentsEditor.propTypes = {
  canEditData: PropTypes.bool,
  odp: PropTypes.object,
}

export default CommentsEditor
