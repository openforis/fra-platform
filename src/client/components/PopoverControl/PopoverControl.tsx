import './popoverControl.scss'
import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

export type PopoverItem = {
  content?: ReactNode
  divider?: boolean
  link?: string
  onClick?: () => void
}

type Props = {
  items: Array<PopoverItem>
}

const PopoverControl: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, items } = props

  const [open, setOpen] = useState<boolean>(false)
  const popoverControlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outsideClick = (event: any) => {
      if (popoverControlRef.current && !popoverControlRef.current.contains(event.target)) setOpen(false)
    }
    window.addEventListener('click', outsideClick)

    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div
      className="popover-control__wrapper"
      onClick={() => setOpen((prevState) => !prevState)}
      onKeyDown={() => setOpen((prevState) => !prevState)}
      ref={popoverControlRef}
      role="button"
      tabIndex={0}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child as ReactElement, {
          className: classNames((child as ReactElement).props.className, { active: open }),
        })
      )}

      {open && items.length > 0 && (
        <div className="popover-control__menu">
          {items.map((item, index) => {
            const { divider, link, content, onClick } = item
            const key = `${index}`

            if (divider) return <div className="popover-control__divider" key={key} />

            if (link)
              return (
                <Link className="popover-control__item-link" key={key} to={link}>
                  {content}
                </Link>
              )

            return (
              <div
                className="popover-control__item"
                key={key}
                onClick={onClick}
                onKeyDown={onClick}
                role="button"
                tabIndex={0}
              >
                {content}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PopoverControl
