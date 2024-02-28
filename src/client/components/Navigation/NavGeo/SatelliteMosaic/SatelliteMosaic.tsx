import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicSelected, useMosaicStatus } from 'client/store/ui/geo'
import LayerToggleControl from 'client/components/Navigation/NavGeo/LayerToggleControl'

const SatelliteMosaic: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const selected = useMosaicSelected()
  const status = useMosaicStatus()

  return (
    <div>
      <LayerToggleControl
        label={t('geo.showSatelliteMosaic')}
        checked={selected ?? false}
        onCheckboxClick={() => dispatch(GeoActions.toggleMosaicLayer())}
        status={status}
      />
    </div>
  )
}

export default SatelliteMosaic
