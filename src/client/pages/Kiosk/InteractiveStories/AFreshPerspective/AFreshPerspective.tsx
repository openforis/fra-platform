import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'

const AFreshPerspective: React.FC = () => {
  return (
    <object
      aria-label="A fresh perspective interactive story"
      className="kiosk-content__embedded-object"
      data="https://www.fao.org/interactive/forest-resources-assessment/2020/en/"
      type="text/html"
    />
  )
}

export default AFreshPerspective
