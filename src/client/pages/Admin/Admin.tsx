import './Admin.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { AdminRouteNames, ClientRoutes } from '@meta/app'
import { Users } from '@meta/user'

import { useUser } from '@client/store/user'

import User from '../User'
import UserManagement from './UserManagement'

const sections = [
  { component: UserManagement, name: 'userManagement', labelKey: 'landing.sections.userManagement' },
  // { name: 'dataExport', labelKey: 'common.dataExport' },
]

const Admin: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()

  if (!Users.isAdministrator(user)) return <Navigate to={ClientRoutes.Root.path} replace />

  return (
    <div className="app-view__content">
      <div className="admin__page-header">
        <h1 className="admin__page-title">{t('admin.admin')}</h1>
      </div>

      <div className="admin__page-menu">
        {sections.map(({ name, labelKey }) => (
          <NavLink
            key={name}
            to={name}
            className={(navData) =>
              classNames('btn admin__page-menu-button', {
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

        <Route path={ClientRoutes.Assessment.Cycle.Admin.User.path.relative} element={<User />} />

        <Route path="*" element={<Navigate to={AdminRouteNames.userManagement} replace />} />
      </Routes>
    </div>
  )
}

export default Admin
