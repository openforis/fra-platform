import React from 'react'

import { useI18n } from '@webapp/components/hooks'

type Props = {
  setOpen: (open: boolean) => void
  open: boolean
}

const Toggle: React.FC<Props> = (props) => {
  const { setOpen, open } = props

  const i18n = useI18n()

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
      {open ? i18n.t('description.done') : i18n.t('description.edit')}
    </span>
  )
}

export default Toggle
