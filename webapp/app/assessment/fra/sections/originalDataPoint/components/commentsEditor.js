import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import { saveDraft } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

const CommentsEditor = props => {
  const { canEditData, odp, title } = props
  const [open, setOpen] = useState(false)
  const textareaRef = useRef(null)
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()

  let descriptionEditor

  const handleOnClick = e => {
    setOpen(!open)
    e.stopPropagation()
  }

  const initCKeditor = () => {
    if (odp.odpId) {
      descriptionEditor.setData(
        odp.description,
        { callback: () => initCkeditorChangeListener() })
    } else {
      initCkeditorChangeListener()
    }
  }


  const initCkeditorChangeListener = () => {
    descriptionEditor.on('change', (evt) => {
      dispatch(saveDraft(countryIso,
        {
          ...odp,
          description: evt.editor.getData()
        }
      ))
    })
  }

  useEffect(() => {
    descriptionEditor = CKEDITOR.replace(textareaRef.current, ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    descriptionEditor.on('instanceReady', () => initCKeditor())
    return () => {
      descriptionEditor.destroy(false)
      descriptionEditor = null
    };
  }, [])

  return <div>
    <div className="fra-description__header-row">
      <h3 className="subhead fra-description__header">{title}</h3>
      {
        canEditData &&
        <div className="fra-description__link" onClick={handleOnClick}>
          {open ? i18n.t('description.done') : i18n.t('description.edit')}
        </div>
      }
    </div>

    <div className="cke_wrapper" style={{ display: open ? 'block' : 'none' }}>
      <textarea ref={textareaRef} />
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
  title: PropTypes.string,
  i18n: PropTypes.object,
}

export default CommentsEditor
