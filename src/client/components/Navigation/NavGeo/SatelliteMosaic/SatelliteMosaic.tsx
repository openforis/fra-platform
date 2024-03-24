import './SatelliteMosaic.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicSelected, useMosaicStatus } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import ToggleControl from 'client/components/Navigation/NavGeo/Layer/ToggleControl'
import MosaicControl from 'client/components/Navigation/NavGeo/SatelliteMosaic/MosaicControl'

const SatelliteMosaic: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const selected = useMosaicSelected()
  const status = useMosaicStatus()

  return (
    <div className="geo-satellite-mosaic">
      <ToggleControl
        checked={selected ?? false}
        label={t('geo.showSatelliteMosaic')}
        onCheckboxClick={() => dispatch(GeoActions.toggleMosaicLayer())}
        status={status ?? LayerFetchStatus.Unfetched}
      />
      <MosaicControl />
    </div>
  )
}

export default SatelliteMosaic
