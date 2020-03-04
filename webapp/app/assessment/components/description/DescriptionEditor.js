import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux';
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import { saveDescriptions } from '@webapp/app/assessment/components/description/actions'

const DescriptionEditor = props => {
  const { section, name, template, content } = props
  const dispatch = useDispatch()
  const textareaRef = useRef(null)
  let editor = useRef(null)
  const countryIso = useCountryIso()
  const initCkeditorChangeListener = () => {
    editor.current.on('change', (evt) => dispatch(saveDescriptions(countryIso, section, name, evt.editor.getData())))
  }
  const setEditorContent = (content) => {
    editor.current.setData(content, {
      callback: () => {
        if (!editor.current.hasListeners('change'))
          initCkeditorChangeListener()
      }
    })
  }
  useEffect(() => {
    editor.current = CKEDITOR.replace(textareaRef.current, ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    editor.current.on('instanceReady', () => {
      setEditorContent(content || template)
    })
    return () => {
      editor.current.destroy(false)
      editor = null
    }
  }, [])
  return <div className="cke_wrapper">
    <textarea id={name} ref={textareaRef} />
  </div>
}

DescriptionEditor.propTypes = {
  name: PropTypes.string,
  template: PropTypes.string,
  section: PropTypes.string.isRequired,
  content: PropTypes.string,
}

export default DescriptionEditor
