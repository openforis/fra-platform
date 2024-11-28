import './Kiosk.scss'
import React from 'react'

import { Routes } from 'meta/routes'

import Card from 'client/pages/Kiosk/components/Card'
import { KioskCardProps } from 'client/pages/Kiosk/components/Card/types'

const cards: Array<KioskCardProps> = [
  {
    altText: 'FRA process',
    imageUrl: '/img/kiosk/FRA-process.png',
    link: Routes.FraProcess.path.relative,
    title: 'FRA \n process',
  },
  {
    altText: 'Recent highlights',
    imageUrl: '/img/kiosk/recent-highlights.jpg',
    link: Routes.RecentHighlights.path.relative,
    title: 'Recent \n highlights',
  },
  {
    altText: 'FRA2020 data platform',
    imageUrl: '/img/map.png',
    link: Routes.Fra2020DataPlatform.path.relative,
    title: 'FRA2020 \n data platform',
  },
  {
    altText: 'Interactive stories',
    imageUrl: '/img/kiosk/interactive-stories.png',
    link: Routes.InteractiveStories.path.relative,
    title: 'Interactive \n stories',
  },
  {
    altText: 'Forest kids',
    imageUrl: '/img/kiosk/forest-kids.png',
    link: Routes.ForestKids.path.relative,
    title: 'Forest Kids \n video game',
  },
]

const Kiosk: React.FC = () => {
  return (
    <div className="kiosk-content">
      <h1 className="kiosk-content__title">Global Forest Resources Assessment</h1>
      <div className="kiosk-content__grid-container">
        {cards.map(({ altText, imageUrl, link, title }) => (
          <Card key={title} altText={altText} imageUrl={imageUrl} link={link} title={title} />
        ))}
      </div>
    </div>
  )
}

export default Kiosk
