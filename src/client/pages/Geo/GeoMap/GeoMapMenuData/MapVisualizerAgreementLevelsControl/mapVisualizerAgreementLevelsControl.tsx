import './mapVisualizerAgreementLevelsControl.scss'
import React from 'react'

import Icon from '@client/components/Icon'

const boxes = [
  { title: '1', disabled: false, checked: true },
  { title: '2', disabled: false, checked: true },
  { title: '3', disabled: false, checked: true },
  { title: '4', disabled: false, checked: false },
  { title: '5', disabled: true, checked: false },
  { title: '6', disabled: true, checked: false },
  { title: '7', disabled: true, checked: false },
  { title: '8', disabled: true, checked: false },
]

const AgreementLevelsControl: React.FC = () => {
  return (
    <div className="geo-map-menu-data-visualizer-agreement-levels-control">
      <p>
        <strong>Choose the agreement level between all map layers</strong>
        <br />
        <br />
        <small>
          Agreement level &rdquo;N&rdquo; means that at least N of selected data sources need to agree that a certain
          pixel is forest area
        </small>
      </p>
      <div className="geo-map-menu-data-visualizer-agreement-levels-boxes">
        {boxes.map((box) => (
          <div
            key={box.title}
            className={
              box.disabled
                ? 'geo-map-menu-data-visualizer-agreement-levels-box disabled'
                : 'geo-map-menu-data-visualizer-agreement-levels-box'
            }
            aria-disabled={box.disabled}
          >
            {box.disabled ? <Icon name="alert" /> : <Icon name={box.checked ? 'remove' : 'circle-add'} />}
            <br />
            <p>{box.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgreementLevelsControl
