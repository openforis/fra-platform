import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  setOpen: (open: boolean) => void
  open: boolean
}

const Toggle: React.FC<Props> = (props) => {
  const { setOpen, open } = props

  const i18n = useTranslation()

  return (
    <span
      role="button"
      aria-label=""
      tabIndex={0}
      className="link fra-description__link no-print"
      onClick={() => {
        setOpen(!open)
      }}
      onKeyDown={() => {
        setOpen(!open)
      }}
    >
      {open ? i18n.t<string>('description.done') : i18n.t<string>('description.edit')}
    </span>
  )
}

export default Toggle
