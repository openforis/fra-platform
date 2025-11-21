import './SlidingPanel.scss'
import React, { useMemo } from 'react'

import classNames from 'classnames'

import ButtonClose from 'client/components/Buttons/ButtonClose'

import { useSlidingPanelMount } from './hooks/useSlidingPanelMount'

type Props = {
  closePanel: () => void
  noBackdrop?: boolean
  opened: boolean
  size?: number
}

const SlidingPanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, closePanel, noBackdrop = false, opened, size = 30 } = props

  const panelStyle = useMemo<Record<string, string>>(() => {
    return { '--sliding-panel-width': `${size}vw` }
  }, [size])

  const { active, displayChildren, onTransitionEnd } = useSlidingPanelMount({ opened })

  return (
    <div
      aria-hidden={!active}
      className={classNames('sliding-panel-container', {
        active,
        'click-through': noBackdrop,
      })}
      onTransitionEnd={onTransitionEnd}
      style={panelStyle}
    >
      {displayChildren && (
        <>
          {!noBackdrop && (
            /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <div className="sliding-panel-backdrop" onClick={closePanel} />
          )}

          <div className="sliding-panel-track">
            <div className="sliding-panel">
              <ButtonClose className="sliding-panel__close" onClick={closePanel} />
              <div className="panel-container">{children}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SlidingPanel
