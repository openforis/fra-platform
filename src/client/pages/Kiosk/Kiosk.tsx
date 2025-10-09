import './Kiosk.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes'

import Card from 'client/pages/Kiosk/components/Card'
import { KioskCardProps } from 'client/pages/Kiosk/components/Card/types'

type KioskCardConfig = Omit<KioskCardProps, 'title'> & { titleKey: string }

const cards: Array<KioskCardConfig> = [
  {
    altText: 'FRA process',
    imageUrl: '/img/kiosk/FRA-process.png',
    link: Routes.FraProcess.path.relative,
    titleKey: 'fraProcess',
  },
  {
    altText: 'Recent highlights',
    imageUrl: '/img/kiosk/recent-highlights.jpg',
    link: Routes.RecentHighlights.path.relative,
    titleKey: 'recentHighlights',
  },
  {
    altText: 'Explore FRA Data',
    imageUrl: '/img/fra/latest/landing/map.png',
    link: Routes.FraDataPlatform.path.relative,
    titleKey: 'exploreFraData',
  },
  {
    altText: 'Latest activities',
    imageUrl: '/img/kiosk/latest-activities.png',
    link: Routes.LatestActivities.path.relative,
    titleKey: 'remoteSensingSurvey',
  },
  {
    altText: 'Interactive stories',
    imageUrl: '/img/kiosk/interactive-stories.png',
    link: Routes.InteractiveStories.path.relative,
    titleKey: 'interactiveStories',
  },
  {
    altText: 'Forest kids',
    imageUrl: '/img/kiosk/forest-kids.png',
    link: Routes.ForestKids.path.relative,
    titleKey: 'forestKidsVideoGame',
  },
]

const Kiosk: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="kiosk-content">
      <div>
        <h1 className="kiosk-content__title">
          Global Forest Resources
          <br />
          Assessment (FRA)
        </h1>
        <div className="kiosk-content__grid-container">
          {cards.map(({ altText, imageUrl, link, titleKey }) => (
            <Card key={titleKey} altText={altText} imageUrl={imageUrl} link={link} title={t(`kiosk.${titleKey}`)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Kiosk
