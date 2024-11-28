import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

const ExploringOurForests: React.FC = () => {
  return (
    <object
      aria-label="Exploring our forests interactive story"
      className="kiosk-content__embedded-object"
      data="https://www.fao.org/interactive/forests-2020-remotesensing-forestwater/en/"
      type="text/html"
    />
  )
}

export default ExploringOurForests
