import React from 'react'

const HiddenInPlainSight: React.FC = () => {
  return (
    <object
      aria-label="Hidden in plain sight interactive story"
      className="kiosk-content__embedded-object"
      data="https://www.fao.org/interactive/dryland-assessment/en/"
      type="text/html"
    />
  )
}

export default HiddenInPlainSight
