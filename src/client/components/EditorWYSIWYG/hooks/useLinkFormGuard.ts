import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import { Objects } from 'utils/objects'

import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

type OnChange = (value?: string) => void

type Props = {
  onChange: OnChange
  value?: string
}

// Jodit's link form adds a second link instead of updating the link if the content is replaced while it's open.
// So while the form is open we leave the content alone, and close the form if a new value comes in from outside.
export const useLinkFormGuard = (props: Props): OnChange => {
  const { onChange, value } = props

  const { jodit } = useRepositoryLinkContext()
  const linkFormRef = useRef<HTMLElement>(undefined)
  const savedValueRef = useRef<string>(undefined)

  useEffect(() => {
    if (Objects.isEmpty(jodit)) return (): void => undefined

    const onLinkFormOpen = (popupContainer?: HTMLElement): void => {
      linkFormRef.current = popupContainer
    }

    const onBeforeSetValue = (newValue?: string): false | undefined => {
      const linkFormOpen = linkFormRef.current?.isConnected === true
      const replacingContent = !Objects.isNil(newValue)

      return linkFormOpen && replacingContent ? false : undefined
    }

    jodit.events?.on('afterLinkOpenPopup', onLinkFormOpen)
    jodit.events?.on('beforeSetValueToEditor', onBeforeSetValue)

    return (): void => {
      jodit.events?.off('afterLinkOpenPopup', onLinkFormOpen)
      jodit.events?.off('beforeSetValueToEditor', onBeforeSetValue)
    }
  }, [jodit])

  useLayoutEffect(() => {
    const linkFormOpen = linkFormRef.current?.isConnected === true
    const savedByEditor = value === savedValueRef.current
    savedValueRef.current = undefined

    if (linkFormOpen && !savedByEditor) jodit.events?.fire('closeAllPopups')
  }, [jodit, value])

  return useCallback<OnChange>(
    (savedValue) => {
      savedValueRef.current = savedValue
      onChange(savedValue)
    },
    [onChange]
  )
}
