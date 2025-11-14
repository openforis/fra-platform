import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Layer } from 'meta/geo/layer/layer'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useGeoLayer } from 'client/store/geo/layers/hooks/layers'
import { useAppDispatch } from 'client/store/hooks'
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

  const layerState = useGeoLayer(layerKey)

  useFetchNewLayerOption(sectionKey, layerKey, 'year', layer)

  const options = useYearOptions({ years: layer.options?.years ?? [] })

  const handleYearChange = useCallback<(year: string) => void>(
    (year) => dispatch(LayersActions.setOptionsProperty({ layerKey, key: 'year', value: parseInt(year, 10) })),
    [dispatch, layerKey]
  )

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
