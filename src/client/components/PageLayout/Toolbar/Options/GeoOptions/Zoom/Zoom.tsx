import React from 'react'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

const Zoom: React.FC = () => {
  return (
    <div className="toolbar-options__group">
      <Button
        iconName="plus-dashed"
        inverse
        onClick={() => {
          // TODO
        }}
        size={ButtonSize.m}
        type={ButtonType.blackMap}
      />
      <Button
        iconName="minus-dashed"
        inverse
        onClick={() => {
          // TODO
        }}
        size={ButtonSize.m}
        type={ButtonType.blackMap}
      />
    </div>
  )
}

export default Zoom
