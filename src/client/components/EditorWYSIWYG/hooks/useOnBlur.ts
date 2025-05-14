import { useCallback, useEffect, useRef } from 'react'

import { Objects } from 'utils/objects'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

import { processor } from './_sanitizer'

type OnChange = (value?: string) => void

type Props = {
  onChange: OnChange
  value?: string
}

export const useOnBlur = (props: Props): OnChange => {
  const { onChange, value } = props

  const { jodit, repositoryOpened } = useRepositoryLinkContext()
  const valueRef = useRef<string>(value)
  const pastedHtmlRef = useRef<boolean>(false)

  useEffect(() => {
    valueRef.current = value
  }, [value])

  useEffect(() => {
    if (Objects.isEmpty(jodit)) return () => undefined

    const onBeforeOpenPasteDialog = () => {
      pastedHtmlRef.current = true
    }
    jodit.events?.on('beforeOpenPasteDialog', onBeforeOpenPasteDialog)

    return () => {
      jodit.events?.off('beforeOpenPasteDialog', onBeforeOpenPasteDialog)
    }
  }, [jodit])

  return useCallback<OnChange>(
    async (newValue: string) => {
      if (pastedHtmlRef.current) {
        pastedHtmlRef.current = false
        return
      }

      if (repositoryOpened) return

      if (newValue === valueRef.current) return

      // Sanitize user input before saving and remove initial empty rows
      const sanitizedValue = (await processor.process(newValue)).toString().replace(/(<div><br><\/div>)*/, '')

      valueRef.current = sanitizedValue
      jodit.setEditorValue(sanitizedValue)
      onChange(sanitizedValue)
    },
    [jodit, onChange, repositoryOpened]
  )
}
