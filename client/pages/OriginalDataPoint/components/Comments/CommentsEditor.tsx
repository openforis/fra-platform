import React, { useState, useEffect, useRef } from 'react'

// import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
// import { useAppDispatch } from '@client/store'
import { useTranslation } from 'react-i18next'

type Props = {
  canEditData: boolean
}

const CommentsEditor: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  // const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const descriptionEditor = useRef(null)

  // const initCkeditorChangeListener = () => {
  //   descriptionEditor.current.on('change', (event: any) => {
  //     const odpUpdate = { ...originalDataPoint, description: event.editor.getData() }
  //     dispatch(OriginalDataPointActions.updateODP({ odp: odpUpdate }))
  //   })
  // }
  //
  // const initCKeditor = () => {
  //   if (originalDataPoint.odpId) {
  //     descriptionEditor.current.setData(originalDataPoint.description, { callback: () => initCkeditorChangeListener() })
  //   } else {
  //     initCkeditorChangeListener()
  //   }
  // }
  //
  // useEffect(() => {
  //   // @ts-ignore
  //   descriptionEditor.current = CKEDITOR.replace(textareaRef.current, ckEditorConfig)
  //   // We need to fetch the data only after CKEDITOR instance is ready :(
  //   // Otherwise there is no guarantee that the setData()-method succeeds in
  //   // setting pre-existing html-content
  //   descriptionEditor.current.on('instanceReady', () => initCKeditor())
  //   return () => {
  //     descriptionEditor.current.destroy(false)
  //     descriptionEditor = null
  //   }
  // }, [])

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

      {originalDataPoint.description && (
        <div
          className="fra-description__preview"
          style={{ display: open ? 'none' : 'block' }}
          dangerouslySetInnerHTML={{ __html: originalDataPoint.description }}
        />
      )}
    </div>
  )
}

export default CommentsEditor
