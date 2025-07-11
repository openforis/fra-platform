import './AxisSelection.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Axis, AxisSelection as AxisSelectionType, AxisType } from 'meta/explorer/selection'

import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'

const axisSelectors = [
  { axisType: AxisType.countries, labelKey: 'common.country' },
  { axisType: AxisType.measures, labelKey: 'common.variable' },
  { axisType: AxisType.dimensions, labelKey: 'common.column' },
]

const axes = [Axis.x, Axis.y]

type Props = {
  axisSelection: AxisSelectionType
  toggleAxis: (props: { axis: Axis; axisType: AxisType }) => void
}

const AxisSelection: React.FC<Props> = (props: Props) => {
  const { axisSelection, toggleAxis } = props
  const { t } = useTranslation()

  return (
    <>
      <h2 className="options-title">{t('common.axis')}</h2>
      <div className="axis-selection">
        {axisSelectors.map(({ axisType, labelKey }) => (
          <React.Fragment key={axisType}>
            <span>{t(labelKey)}:</span>
            <div className="axis-selection-buttons">
              {axes.map((axis) => (
                <ButtonCheckbox
                  key={axis}
                  checked={axisSelection[axis].includes(axisType)}
                  label={axis.toUpperCase()}
                  onClick={() => toggleAxis({ axis, axisType })}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default AxisSelection
