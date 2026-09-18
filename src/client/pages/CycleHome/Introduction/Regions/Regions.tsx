import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { TrackId } from 'meta/tracking/id'

import { useRegionGroups } from 'client/store/area/hooks/regions'
import { useNavigateToArea } from 'client/hooks/navigateToArea'
import { useShowRegions } from 'client/hooks/showRegions'
import Select, { Option, SelectSize } from 'client/components/Inputs/Select'

const includeRegions = ['fra2020', 'secondary']

const Regions: React.FC = () => {
  const { t } = useTranslation()
  const showRegions = useShowRegions()
  const regionGroups = useRegionGroups()
  const navigateToArea = useNavigateToArea()

  const options = useMemo<Array<Option>>(() => {
    return Object.values(regionGroups).reduce<Array<Option>>((acc, regionGroup) => {
      if (includeRegions.includes(regionGroup.name)) {
        regionGroup.regions.forEach((region) => {
          const { regionCode } = region
          if (!Areas.isAtlantis(regionCode)) {
            const option = { label: t(Areas.getTranslationKey(regionCode)), value: regionCode }
            acc.push(option)
          }
        })
      }
      return acc
    }, [])
  }, [regionGroups, t])

  if (!showRegions) {
    return null
  }

  const handleChange = (areaCode: AreaCode): void => {
    // gtag is defined in index.html only for prod
    // @ts-ignore
    window.gtag?.('event', 'app_select', { element_id: TrackId.landingSelectRegions, value: areaCode })
    navigateToArea(areaCode)
  }

  return (
    <div className="home-area-selector__group">
      <img alt="" src="/img/iconRegions.svg" />
      <div>{t('common.regions')}</div>
      <Select onChange={handleChange} options={options} placeholder={t('common.select')} size={SelectSize.m} />
    </div>
  )
}

export default Regions
