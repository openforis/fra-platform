import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Layer, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import SelectPrimary from 'client/components/Inputs/SelectPrimary'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'
import { useYearOptions } from 'client/components/Navigation/NavGeo/Layer/YearControl/hooks/useYearOptions'
import { useFetchNewLayerOption } from 'client/pages/Geo/Map/hooks'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

const YearControl: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props
  const layerKey = layer.key

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const layerState = useGeoLayer(sectionKey, layerKey)

  useFetchNewLayerOption(sectionKey, layerKey, 'year', layer)

  const options = useYearOptions({ years: layer.options?.years ?? [] })

  const handleYearChange = (year: string) => {
    dispatch(GeoActions.setLayerYear({ layerKey, sectionKey, year: parseInt(year, 10) }))
  }

  return (
    <OptionsGrid
      className={classNames('geo-options-grid__one-col', {
        'geo-options-grid__error': layerState?.options?.year === undefined,
      })}
    >
      <OptionLabel>{t('common.year')}</OptionLabel>
      <SelectPrimary
        isClearable={false}
        onChange={handleYearChange}
        options={options}
        value={layerState?.options?.year?.toString()}
      />
    </OptionsGrid>
  )
}

export default YearControl
