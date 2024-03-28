import './NavGeo.scss'
import React, { useCallback, useMemo, useState } from 'react'

import { sections } from 'meta/geo'

import { useOnUpdate } from 'client/hooks'
import Icon from 'client/components/Icon'
import GeoSection from 'client/components/Navigation/NavGeo/GeoSection'
import LayersSection from 'client/components/Navigation/NavGeo/LayersSection'
import SatelliteMosaic from 'client/components/Navigation/NavGeo/SatelliteMosaic'

type Props = {
  toggleExpanded: () => void
}
type SectionsExpanded = Record<string, boolean>

const satelliteMosaicKey = 'geo-nav-section-satelliteMosaic'
const sectionKeys = [satelliteMosaicKey, ...sections.map((section) => section.titleKey)]
const initialStateSectionsExpanded = sectionKeys.reduce<SectionsExpanded>(
  (acc, section) => ({ ...acc, [section]: false }),
  {}
)

const NavGeo: React.FC<Props> = (props) => {
  const { toggleExpanded } = props

  const [sectionsExpanded, setSectionsExpanded] = useState<SectionsExpanded>(initialStateSectionsExpanded)

  const hasExpanded = useMemo<boolean>(() => Object.values(sectionsExpanded).some((value) => value), [sectionsExpanded])

  const makeSetExpanded = useCallback((titleKey: string) => {
    return (expanded: boolean) => {
      setSectionsExpanded((prevState) => ({ ...prevState, [titleKey]: expanded }))
    }
  }, [])

  useOnUpdate(toggleExpanded, [hasExpanded, toggleExpanded])

  return (
    <div className="nav-geo">
      <GeoSection
        key={satelliteMosaicKey}
        expanded={sectionsExpanded[satelliteMosaicKey]}
        icon={<Icon name="radar" />}
        labelKey="geo.satelliteMosaic"
        setExpanded={makeSetExpanded(satelliteMosaicKey)}
      >
        <SatelliteMosaic />
      </GeoSection>

      {sections.map((section) => {
        const { key, titleKey } = section
        return (
          <React.Fragment key={`geo-nav-section-${key}`}>
            <GeoSection
              expanded={sectionsExpanded[titleKey]}
              icon={<Icon name="layers" />}
              labelKey={titleKey}
              setExpanded={makeSetExpanded(titleKey)}
            >
              <LayersSection section={section} />
            </GeoSection>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default NavGeo
