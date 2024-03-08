import './YearControl.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Layer, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import Select from 'client/components/Inputs/Select'
import { useFetchNewLayerOption } from 'client/pages/Geo/GeoMap/hooks'

import { useYearOptions } from './hooks/useYearOptions'

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
    <div
      className={classNames('geo-year-control__container', {
        error: layerState?.options?.year === undefined,
      })}
    >
      <span>{t('common.year')}</span>
      <div className="geo-year-control__selector validation-error-sensitive-field">
        <Select
          isClearable={false}
          onChange={handleYearChange}
          options={options}
          value={layerState?.options?.year?.toString()}
        />
      </div>
    </div>
  )
}

export default YearControl
