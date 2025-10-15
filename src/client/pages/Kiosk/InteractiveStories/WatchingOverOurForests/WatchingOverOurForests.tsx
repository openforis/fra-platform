import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

const WatchingOverOurForests: React.FC = () => {
  return (
    <object
      aria-label="Watching over our forests interactive story"
      className="kiosk-content__embedded-object"
      data="https://www.fao.org/interactive/2025/forest-resources-assessment/en/"
      type="text/html"
    />
  )
}

export default WatchingOverOurForests
