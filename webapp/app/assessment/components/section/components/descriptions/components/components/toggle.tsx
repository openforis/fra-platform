import React from 'react'

type Props = {
  setOpen: (...args: any[]) => any
  open: boolean
  i18n: any
}

const Toggle = (props: Props) => {
  const { setOpen, open, i18n } = props
  return (
    <span
      role="button"
      aria-label=""
      tabIndex={0}
      className="fra-description__link no-print"
      onClick={() => {
        setOpen(!open)
      }}
      onKeyDown={() => {}}
    >
      {open ? i18n.t('description.done') : i18n.t('description.edit')}
    </span>
  )
}

export default Toggle
