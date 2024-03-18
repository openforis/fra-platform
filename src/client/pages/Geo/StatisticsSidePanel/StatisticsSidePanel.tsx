import './StatisticsSidePanel.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useGeoStatisticsHandler } from 'client/pages/Geo/Map/hooks'
import StatisticsSection from 'client/pages/Geo/StatisticsSection'
import BurnedAreaPanel from 'client/pages/Geo/StatisticsSidePanel/BurnedAreaPanel'
import ProtectedAreaPanel from 'client/pages/Geo/StatisticsSidePanel/ProtectedAreaPanel'
import StatisticalGraphsPanel from 'client/pages/Geo/StatisticsSidePanel/StatisticalGraphsPanel'
import TreeCoverAreaPanel from 'client/pages/Geo/StatisticsSidePanel/TreeCoverAreaPanel'

const StatisticsSidePanel: React.FC = () => {
  const [open, setOpen] = useState(true)

  const { t } = useTranslation()

  const year = 2020 // Default value is 2020 for now
  useGeoStatisticsHandler({ year })

  const handleNotchClick = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <div className={classNames('geo-statistics-side-panel', { open })}>
      <button
        aria-label={t('geo.statistics.title')}
        className="geo-statistics-side-panel__notch-button"
        onClick={handleNotchClick}
        type="button"
      />
      <div className="geo-statistics-side-panel__content-container">
        <StatisticsSection titleKey="geo.statistics.forestArea.extentOfForestTreeCover">
          <TreeCoverAreaPanel year={year} />
        </StatisticsSection>

        <StatisticsSection titleKey="geo.statistics.graphs">
          <StatisticalGraphsPanel year={year} />
        </StatisticsSection>

        <StatisticsSection titleKey="geo.protectedArea">
          <ProtectedAreaPanel year={year} />
        </StatisticsSection>

        <StatisticsSection titleKey="geo.burnedArea">
          <BurnedAreaPanel year={year} />
        </StatisticsSection>
      </div>
    </div>
  )
}

export default StatisticsSidePanel
