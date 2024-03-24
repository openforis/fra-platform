import './AgreementLevelSelector.scss'
import React from 'react'

import classNames from 'classnames'

import { Layer, LayerSectionKey } from 'meta/geo/layer'

import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'

import { useAgreementLevelSelectorData } from './hooks/useAgreementLevelData'
import { getLevelStyle } from './utils'

type Props = {
  layer: Layer
  onChange: (value: number) => void
  sectionKey: LayerSectionKey
}

const AgreementLevelSelector: React.FC<Props> = (props) => {
  const { layer, onChange, sectionKey } = props

  const { currentSelectedLevel, eligiblePalette, selectedLayersCount } = useAgreementLevelSelectorData({
    layer,
    sectionKey,
  })

  return (
    <div className="geo-options-grid__one-col geo-agreement-level-selector__container">
      {(layer.options?.agreementLayer?.agreementLevels ?? []).map((level) => {
        const id = `${sectionKey}-agreement-${level}`
        const disabled = level > selectedLayersCount
        const style = getLevelStyle(level, eligiblePalette, currentSelectedLevel, selectedLayersCount)
        return (
          <div key={id} className={classNames('geo-agreement-level-selector__checkbox-container', { disabled })}>
            <input
              checked={level <= currentSelectedLevel}
              className="geo-agreement-level-selector__checkbox"
              disabled={disabled}
              id={id}
              onChange={() => onChange(level)}
              style={style}
              type="checkbox"
            />
            <label htmlFor={id}>
              <OptionLabel>{level}</OptionLabel>
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default AgreementLevelSelector
