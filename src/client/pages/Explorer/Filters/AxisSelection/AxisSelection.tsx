import './AxisSelection.scss'
import React from 'react'

import classNames from 'classnames'

import { Axis, AxisType } from 'meta/explorer/selection'

import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'

import { useToggleAxis } from './hooks/useToggleAxis'

const axisTypes = [AxisType.countries, AxisType.measures, AxisType.dimensions]
const axes = [Axis.x, Axis.y]

const AxisSelection: React.FC = () => {
  const { x, y } = useExplorerAxisSelection()
  const toggleAxis = useToggleAxis()

  return (
    <>
      {axisTypes.map((axisType, idx) => (
        <div key={axisType} className={classNames('axis-selection', { 'first-element': idx === 0 })}>
          {axes.map((axis) => (
            <ButtonCheckbox
              key={axis}
              checked={axis === Axis.x ? x.includes(axisType) : y.includes(axisType)}
              label={axis}
              onClick={() => toggleAxis({ axis, axisType })}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default AxisSelection
