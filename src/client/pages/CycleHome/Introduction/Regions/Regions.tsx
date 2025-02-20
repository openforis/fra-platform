import React from 'react'
import { useTranslation } from 'react-i18next'

import { useShowRegions } from 'client/hooks/useShowRegions'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'

const Regions = () => {
  const { t } = useTranslation()
  const showRegions = useShowRegions()

  if (!showRegions) {
    return null
  }

  return (
    <div className="home-area-selector__group">
      <img alt="" src="/img/iconRegions.svg" />
      <div>{t('common.regions')}</div>
      <AreaSelector includeRegions={['fra2020', 'secondary']} placeholder="common.select" />
    </div>
  )
}

export default Regions
