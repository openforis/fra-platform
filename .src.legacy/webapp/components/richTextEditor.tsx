import React, { useRef, useEffect } from 'react'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

type Props = {
  name: string
  value?: string
  onChange?: (...args: any[]) => any
}

const RichTextEditor = (props: Props) => {
  const { name, value, onChange } = props
  const textareaRef = useRef(null)
  let editor = useRef(null)
  const initCkeditorChangeListener = () => {
    editor.current.on('change', (evt: any) => {
      const editorData = evt.editor.getData()
      onChange(editorData)
    })
  }
  const setEditorContent = (_content: any) => {
    editor.current.setData(_content, {
      callback: () => {
        if (!editor.current.hasListeners('change')) initCkeditorChangeListener()
      },
    })
  }
  useEffect(() => {
    editor.current = (window as any).CKEDITOR.replace(textareaRef.current, ckEditorConfig)
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
RichTextEditor.defaultProps = {
  value: '',
  onChange: () => {},
}
export default RichTextEditor
