import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import usePostRequest from '@webapp/components/hooks/usePostRequest'

// TODO refactor this away from here
const getUrl = (countryIso, section, name) => `/api/country/descriptions/${countryIso}/${section}/${name}`

const RichTextEditor = props => {
  const { section, name, template, content } = props
  const textareaRef = useRef(null)
  let editor = useRef(null)
  const countryIso = useCountryIso()
  const initCkeditorChangeListener = () => {
    editor.current.on('change', evt => usePostRequest(getUrl(countryIso, section, name), evt.editor.getData()))
  }

  const setEditorContent = _content => {
    editor.current.setData(_content, {
      callback: () => {
        if (!editor.current.hasListeners('change')) initCkeditorChangeListener()
      },
    })
  }

  useEffect(() => {
    editor.current = window.CKEDITOR.replace(textareaRef.current, ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    editor.current.on('instanceReady', () => {
      setEditorContent(content || template)
    })

    return () => {
      editor.current.destroy(false)
      editor = null
    }
  }, [])
  return (
    <div className="cke_wrapper">
      <textarea id={name} ref={textareaRef} />
    </div>
  )
}

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  template: PropTypes.string,
  section: PropTypes.string.isRequired,
  content: PropTypes.string,
}

RichTextEditor.defaultProps = {
  template: '',
  content: '',
}

export default RichTextEditor
