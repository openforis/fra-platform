import './SlidingPanel.scss'
import 'react-sliding-side-panel/lib/index.css'
import React from 'react'
import SlidingPanelComponent from 'react-sliding-side-panel'

import classNames from 'classnames'

type Props = {
  className?: string
  openPanel: boolean
  setOpenPanel: (isOpen: boolean) => void
}

const SlidingPanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, className, openPanel, setOpenPanel } = props
  const panelType = 'right'
  const panelSize = 30

  return (
    <div className="example-container">
      <SlidingPanelComponent
        type={panelType}
        isOpen={openPanel}
        backdropClicked={() => setOpenPanel(false)}
        size={panelSize}
        panelClassName={classNames('sliding-panel', className)}
        panelContainerClassName=""
      >
        <div className="panel-container">{children}</div>
      </SlidingPanelComponent>
    </div>
  )
}

SlidingPanel.defaultProps = {
  className: '',
}

export default SlidingPanel
