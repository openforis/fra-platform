import './SlidingPanel.scss'
import 'react-sliding-side-panel/lib/index.css'
import React from 'react'
import SlidingPanelComponent from 'react-sliding-side-panel'

import ButtonClose from 'client/components/Buttons/ButtonClose'

type Props = {
  closePanel: () => void
  opened: boolean
  size?: number
}

const SlidingPanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, closePanel, opened, size } = props
  const panelType = 'right'

  return (
    <SlidingPanelComponent
      backdropClicked={closePanel}
      isOpen={opened}
      panelClassName="sliding-panel"
      size={size}
      type={panelType}
    >
      <>
        <ButtonClose className="sliding-panel__close" onClick={closePanel} />
        <div className="panel-container">{children}</div>
      </>
    </SlidingPanelComponent>
  )
}

SlidingPanel.defaultProps = {
  size: 30,
}

export default SlidingPanel
