import './LayerToggleControl.scss'
import React from 'react'

import classNames from 'classnames'

import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

type Props = {
  backgroundColor?: string
  checked: boolean
  label: string
  onCheckboxClick: () => void
  status?: LayerFetchStatus
}

const LayerToggleControl: React.FC<Props> = (props) => {
  const { backgroundColor, checked, label, onCheckboxClick, status } = props

  let style: React.CSSProperties = { backgroundColor }
  if (!checked || status === LayerFetchStatus.Failed || status === LayerFetchStatus.Loading) {
    style = {}
  }

  return (
    <div className="geo-layer-toggle__container">
      <div
        aria-checked={checked}
        className="geo-layer-toggle__checkbox"
        onClick={onCheckboxClick}
        onKeyDown={onCheckboxClick}
        role="checkbox"
        tabIndex={0}
      >
        <div
          className={classNames({
            'loading-spinner': status === LayerFetchStatus.Loading,
            'fra-checkbox': status !== LayerFetchStatus.Loading,
            failed: status === LayerFetchStatus.Failed,
            checked,
          })}
          style={style}
        />
        <span>{label}</span>
      </div>
    </div>
  )
}

LayerToggleControl.defaultProps = {
  backgroundColor: null,
  status: null,
}

export default LayerToggleControl
