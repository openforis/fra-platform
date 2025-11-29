import './KioskLayout.scss'
import React from 'react'
import { Outlet } from 'react-router'

import SidePanel from './SidePanel'

const KioskLayout: React.FC = () => {
  return (
    <div className="kiosk-container">
      <SidePanel />
      <Outlet />
    </div>
  )
}

export default KioskLayout
