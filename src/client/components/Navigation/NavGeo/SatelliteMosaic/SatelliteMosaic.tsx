import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicSelected, useMosaicStatus } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import LayerToggleControl from 'client/components/Navigation/NavGeo/LayerToggleControl'
import MosaicControl from 'client/components/Navigation/NavGeo/SatelliteMosaic/MosaicControl'

const SatelliteMosaic: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const selected = useMosaicSelected()
  const status = useMosaicStatus()

  return (
    <div>
      <LayerToggleControl
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
