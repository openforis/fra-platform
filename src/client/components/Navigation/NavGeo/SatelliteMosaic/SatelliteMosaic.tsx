import './SatelliteMosaic.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { MosaicActions } from 'client/store/geo/mosaic/actions'
import { useMosaicSelected, useMosaicStatus } from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks'
import ToggleControl from 'client/components/Navigation/NavGeo/Layer/ToggleControl'
import MosaicControl from 'client/components/Navigation/NavGeo/SatelliteMosaic/MosaicControl'

const SatelliteMosaic: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const selected = useMosaicSelected()
  const status = useMosaicStatus()
  const countryIso = useCountryIso()

  return (
    <div className="geo-satellite-mosaic">
      <ToggleControl
        checked={selected ?? false}
        label={t('geo.showSatelliteMosaic')}
        onCheckboxClick={() => dispatch(MosaicActions.toggleLayer({ countryIso }))}
        status={status ?? LayerFetchStatus.Unfetched}
      />
      <MosaicControl />
    </div>
  )
}

export default SatelliteMosaic
