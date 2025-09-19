import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

const FraDataPlatform: React.FC = () => {
  return (
    <object
      aria-label="FRA data platform"
      className="kiosk-content__embedded-object"
      data="https://fra-data.fao.org/assessments/fra/2020"
      type="text/html"
    />
  )
}

export default FraDataPlatform
