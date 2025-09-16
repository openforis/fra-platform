import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

const ForestKids: React.FC = () => {
  return (
    <object
      aria-label="Forest Kids video game"
      className="kiosk-content__embedded-object"
      data="https://forestkids.herokuapp.com"
      type="text/html"
    />
  )
}

export default ForestKids
