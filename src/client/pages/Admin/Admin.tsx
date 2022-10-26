import './Admin.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { AdminRouteNames } from '@meta/app'

import UserManagement from './UserManagement'

const sections = [
  { component: UserManagement, name: 'userManagement', labelKey: 'landing.sections.userManagement' },
  // { name: 'dataExport', labelKey: 'common.dataExport' },
]

const Admin: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title title">{t('admin.admin')}</h1>
      </div>

      <div className="landing__page-menu">
        {sections.map(({ name, labelKey }) => (
          <NavLink
            key={name}
            to={name}
            className={(navData) =>
              classNames('btn landing__page-menu-button', {
                disabled: navData.isActive,
              })
            }
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </div>

      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} path={name} element={React.createElement(component, {})} />
        ))}

        <Route path="*" element={<Navigate to={AdminRouteNames.userManagement} replace />} />
      </Routes>
    </div>
  )
}

export default Admin
