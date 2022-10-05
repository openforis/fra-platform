import './mapVisualizerAgreementLevelsControl.scss'
import React from 'react'

const AgreementLevelsControl: React.FC = () => {
  return (
    <div>
      <p>
        <strong>Choose the agreement level between all map layers</strong>
        <br />
        <br />
        <small>
          Agreement level &rdquo;N&rdquo; means that at least N of selected data sources need to agree that a certain
          pixel is forest area
        </small>
      </p>
    </div>
  )
}

export default AgreementLevelsControl
