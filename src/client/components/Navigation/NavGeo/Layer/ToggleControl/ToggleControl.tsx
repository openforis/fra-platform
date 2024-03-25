import './ToggleControl.scss'
import React from 'react'

import classNames from 'classnames'

import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'

type Props = {
  backgroundColor?: string
  checked: boolean
  label: string
  onCheckboxClick: () => void
  status?: LayerFetchStatus
}

const ToggleControl: React.FC<Props> = (props) => {
  const { backgroundColor, checked, label, onCheckboxClick, status } = props

  return (
    <div className={classNames(`geo-layer-toggle_${backgroundColor?.replaceAll('#', '')}`, { checked })}>
      <ButtonCheckbox
        checked={checked}
        className="checkbox"
        label={label}
        loading={status === LayerFetchStatus.Loading}
        onClick={onCheckboxClick}
      />
    </div>
  )
}

ToggleControl.defaultProps = {
  backgroundColor: null,
  status: null,
}

export default ToggleControl
