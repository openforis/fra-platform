import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

const RichTextEditor = props => {
  const { name, value, onChange } = props

  const textareaRef = useRef(null)
  let editor = useRef(null)

  const initCkeditorChangeListener = () => {
    editor.current.on('change', evt => {
      const editorData = evt.editor.getData()
      onChange(editorData)
    })
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
      setEditorContent(value)
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
  value: PropTypes.string,
  onChange: PropTypes.func,
}

RichTextEditor.defaultProps = {
  value: '',
  onChange: () => {},
}

export default RichTextEditor
