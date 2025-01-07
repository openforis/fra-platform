import './InteractiveStories.scss'
import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

import { Routes } from 'meta/routes'

import Card from 'client/pages/Kiosk/components/Card/'
import { KioskCardProps } from 'client/pages/Kiosk/components/Card/types'

const cards: Array<KioskCardProps> = [
  {
    altText: 'A fresh perspective',
    imageUrl: '/img/kiosk/interactive-stories.png',
    link: Routes.AFreshPerspective.path.relative,
    title: 'A fresh \n perspective',
  },
  {
    altText: 'Hidden in plain sight',
    imageUrl: '/img/kiosk/hidden-in-plain-sight.png',
    link: Routes.HiddenInPlainSight.path.relative,
    title: 'Hidden \n in plain sight',
  },
  {
    altText: 'Exploring our forests',
    imageUrl: '/img/kiosk/exploring-our-forests.png',
    link: Routes.ExploringOurForests.path.relative,
    title: 'Exploring \n our forests',
  },
  {
    altText: 'The secrets of mangroves',
    imageUrl: '/img/kiosk/the-secrets-of-mangroves.png',
    link: Routes.TheSecretsOfMangroves.path.relative,
    title: 'The secrets \n of mangroves',
  },
]

const InteractiveStories: React.FC = () => {
  return (
    <div className="kiosk-content">
      <div>
        <h1 className="kiosk-content__title">Interactive Stories</h1>
        <div className="kiosk-interactive-stories__grid-container">
          {cards.map(({ altText, imageUrl, link, title }) => (
            <Card key={title} altText={altText} imageUrl={imageUrl} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InteractiveStories
