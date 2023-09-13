import './SlidingPanel.scss'
import 'react-sliding-side-panel/lib/index.css'
import React from 'react'
import SlidingPanelComponent from 'react-sliding-side-panel'

type Props = {
  openPanel: boolean
  setOpenPanel: (isOpen: boolean) => void
}

const SlidingPanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, openPanel, setOpenPanel } = props
  const panelType = 'right'
  const panelSize = 30

  return (
    <SlidingPanelComponent
      type={panelType}
      isOpen={openPanel}
      backdropClicked={() => setOpenPanel(false)}
      size={panelSize}
      panelClassName="sliding-panel"
      panelContainerClassName=""
    >
      <div className="panel-container">{children}</div>
    </SlidingPanelComponent>
  )
}

export default SlidingPanel
