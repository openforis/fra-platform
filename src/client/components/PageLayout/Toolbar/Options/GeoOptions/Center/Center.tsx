import React from 'react'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

const Center: React.FC = () => {
  return (
    <div className="toolbar-options__group">
      <Button
        iconName="gps-not-fixed"
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

export default Center
