import './SlidingPanel.scss'
import 'react-sliding-side-panel/lib/index.css'
import React from 'react'
import SlidingPanelComponent from 'react-sliding-side-panel'

import Icon from 'client/components/Icon'

type Props = {
  openPanel: boolean
  closePanel: () => void
}

const SlidingPanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, openPanel, closePanel } = props
  const panelType = 'right'
  const panelSize = 30

  return (
    <SlidingPanelComponent
      type={panelType}
      isOpen={openPanel}
      backdropClicked={closePanel}
      size={panelSize}
      panelClassName="sliding-panel"
      panelContainerClassName=""
    >
      <>
        <button className="btn-s btn btn-transparent sliding-panel__close" onClick={closePanel} type="button">
          <Icon name="remove" />
        </button>
        <div className="panel-container">{children}</div>
      </>
    </SlidingPanelComponent>
  )
}

export default SlidingPanel
