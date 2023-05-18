import './AgreementLevelSelector.scss'
import React from 'react'

import classNames from 'classnames'

import { LayerSection } from '@meta/geo/layer'

import { LayerState } from '@client/store/ui/geo/stateType'

interface Props {
  countLayersSelected: number
  layerState: LayerState
  section: LayerSection
  onChange: (value: number) => void
}
const AgreementLevelSelector: React.FC<Props> = ({ countLayersSelected, layerState, section, onChange }) => {
  return (
    <div className="geo-map-menu-data-visualizer-agreement-level-boxes">
      {Array(section.layers.length - 1) // Layers excluding Agreement
        .fill(undefined)
        .map((_, i) => {
          const currentSelectedLevel = layerState?.options?.agreementLayer?.level
          const currentAgreementPaletteLength = layerState?.options?.agreementLayer?.palette?.length
          const level = i + 1
          const id = `${section.key}-agreement-${level}`
          const disabled = level > countLayersSelected
          // Agreement layer color legend
          const agreementLevelOffset = level - currentSelectedLevel
          const genericStyle =
            agreementLevelOffset >= 0 &&
            level <= countLayersSelected &&
            agreementLevelOffset < currentAgreementPaletteLength
              ? {
                  backgroundColor: `${layerState?.options?.agreementLayer?.palette?.[agreementLevelOffset]}`,
                }
              : {}
          const selectedStyle =
            currentAgreementPaletteLength > 0
              ? {
                  backgroundColor: `${layerState?.options?.agreementLayer?.palette?.[agreementLevelOffset]}`,
                  boxShadow: `0px 0px 3px 3px ${layerState?.options?.agreementLayer?.palette?.[agreementLevelOffset]}30`,
                }
              : {}

          const style = level === currentSelectedLevel ? selectedStyle : genericStyle

          return (
            <span className={classNames('geo-map-menu-data-visualizer-agreement-level', { disabled })} key={level}>
              <input
                id={id}
                className="geo-map-menu-data-visualizer-agreement-level-box"
                type="checkbox"
                checked={level <= currentSelectedLevel}
                disabled={disabled}
                onChange={() => onChange(level)}
                style={style}
              />
              <label htmlFor={id}>{level}</label>
            </span>
          )
        })}
    </div>
  )
}

export default AgreementLevelSelector
