import './MosaicControl.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicStatus, useUiMosaicOptions } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import InputRange from 'client/components/Inputs/InputRange'

import useMosaicOptionsData from './hooks/useMosaicOptionsData'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const uiMosaicOptions = useUiMosaicOptions()
  const status = useMosaicStatus()
  const { optionsHaveChanged, sources, years } = useMosaicOptionsData()

  return (
    <div className="geo-mosaic-control">
      <p>{t('common.sources')}</p>
      <div>
        {sources.map(({ key, label }) => (
          <ButtonCheckBox
            key={key}
            checked={uiMosaicOptions.sources.includes(key)}
            className="geo-mosaic-control__source"
            label={label}
            onClick={() => dispatch(GeoActions.toggleMosaicSource(key))}
          />
        ))}
      </div>

      <p>{t('common.year')}</p>
      <select value={uiMosaicOptions.year} onChange={(e) => dispatch(GeoActions.setMosaicYear(Number(e.target.value)))}>
        {years.map((year) => (
          <option key={year}>{year}</option>
        ))}
      </select>

      <p>{t('geo.maxCloudCoverage')}</p>
      <div className="geo-mosaic-control__max-cloud-coverage">
        <InputRange
          onChange={(e) => dispatch(GeoActions.setMosaicMaxCloudCoverage(Number(e.target.value)))}
          unit="%"
          value={uiMosaicOptions.maxCloudCoverage}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        disabled={!optionsHaveChanged}
        onClick={() => dispatch(GeoActions.applyMosaicOptions())}
      >
        {t('common.applyChanges')}
      </button>

      {status === LayerFetchStatus.Failed && (
        <p className="geo-mosaic-control__error-message">{t('geo.error.mosaic.noMosaicAvailableForConfiguration')}</p>
      )}
    </div>
  )
}

export default MosaicControl
