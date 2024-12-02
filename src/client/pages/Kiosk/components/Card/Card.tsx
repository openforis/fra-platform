import './Card.scss'
import 'client/pages/Kiosk/Kiosk.scss'
import React, { useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { KioskCardProps } from './types'

const Card: React.FC<KioskCardProps> = (props: KioskCardProps) => {
  const { altText, imageUrl, link, title } = props

  const navigate = useNavigate()
  const [, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => navigate(link))
  }

  return (
    <button className="kiosk-content__card-button" onClick={handleClick} type="button">
      <img alt={altText} className="kiosk-content__card-img" src={imageUrl} />
      <div className="kiosk-content__card-overlay">
        {title.split('\n').map((line) => (
          <React.Fragment key={line}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </button>
  )
}

export default Card
