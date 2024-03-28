import './StatisticsSidePanel.scss'
import React, { useCallback, useMemo, useState } from 'react'

import classNames from 'classnames'

import Icon from 'client/components/Icon'
import GeoSection from 'client/components/Navigation/NavGeo/GeoSection'
import { useGeoStatisticsHandler } from 'client/pages/Geo/Map/hooks'
import BurnedAreaPanel from 'client/pages/Geo/StatisticsSidePanel/BurnedAreaPanel'
import ProtectedAreaPanel from 'client/pages/Geo/StatisticsSidePanel/ProtectedAreaPanel'
import TreeCoverAreaPanel from 'client/pages/Geo/StatisticsSidePanel/TreeCoverAreaPanel'

type SectionsExpanded = Record<string, boolean>

enum StatKey {
  burnedArea = 'burnedArea',
  protectedArea = 'protectedArea',
  treeCover = 'treeCover',
}
const StatKeys = [StatKey.treeCover, StatKey.protectedArea, StatKey.burnedArea]

const Stats: Record<StatKey, { Component: React.FC<{ year: number }>; icon?: React.ReactNode; titleKey: string }> = {
  [StatKey.burnedArea]: { Component: BurnedAreaPanel, icon: <Icon name="icon-table2" />, titleKey: 'geo.burnedArea' },
  [StatKey.protectedArea]: {
    Component: ProtectedAreaPanel,
    icon: <Icon name="icon-table2" />,
    titleKey: 'geo.protectedArea',
  },
  [StatKey.treeCover]: {
    Component: TreeCoverAreaPanel,
    icon: (
      <>
        <Icon name="icon-bar-chart" />
        <Icon name="icon-table2" />
      </>
    ),
    titleKey: 'geo.statistics.forestArea.extentOfForestTreeCover',
  },
}

const initialStateSectionsExpanded = StatKeys.reduce<SectionsExpanded>(
  (acc, section) => ({ ...acc, [section]: section === StatKey.treeCover }),
  {}
)

const StatisticsSidePanel: React.FC = () => {
  const year = 2020 // Default value is 2020 for now

  const [sectionsExpanded, setSectionsExpanded] = useState<SectionsExpanded>(initialStateSectionsExpanded)

  useGeoStatisticsHandler({ year })
  const expanded = useMemo<boolean>(() => Object.values(sectionsExpanded).some((value) => value), [sectionsExpanded])

  const makeSetExpanded = useCallback((titleKey: string) => {
    return (expanded: boolean) => {
      setSectionsExpanded((prevState) => ({ ...prevState, [titleKey]: expanded }))
    }
  }, [])

  return (
    <div className={classNames('geo-statistics-side-panel', { expanded })}>
      {StatKeys.map((key) => {
        const { Component, icon, titleKey } = Stats[key]

        return (
          <GeoSection
            key={key}
            expanded={sectionsExpanded[key]}
            icon={icon}
            labelKey={titleKey}
            setExpanded={makeSetExpanded(key)}
          >
            <Component year={year} />
          </GeoSection>
        )
      })}
    </div>
  )
}

export default StatisticsSidePanel
