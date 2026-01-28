import { Dispatch, RefObject, useEffect } from 'react'

type Props = {
  wrapperRef: RefObject<HTMLDivElement>
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

export const useHandleOutsideClick = (props: Props): void => {
  const { setOpen, wrapperRef } = props

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return (): void => window.removeEventListener('click', handleOutsideClick)
  }, [setOpen, wrapperRef])
}
