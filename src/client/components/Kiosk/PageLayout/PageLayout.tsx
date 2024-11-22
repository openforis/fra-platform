import './PageLayout.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import SidePanel from './SidePanel'

const PageLayout: React.FC = () => {
  return (
    <div className="kiosk-container">
      <SidePanel />
      <Outlet />
    </div>
  )
}

export default PageLayout
