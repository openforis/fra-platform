import './Admin.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Outlet } from 'react-router'
import classNames from 'classnames'

import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

import { useCountries } from 'client/store/area/hooks/countries'
import { useInjectSlice } from 'client/store/hooks'
import { LinksSlice } from 'client/store/links/slice'
import { LinksSliceName } from 'client/store/links/slice/name'
import { useUser } from 'client/store/user/hooks/user'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'

type Section = {
  labelKey: string
  name: string
}

const sections: Array<Section> = [
  {
    name: SectionNames.Admin.countries,
    labelKey: 'common.countries',
  },
  {
    name: SectionNames.Admin.invitations,
    labelKey: 'common.invitations',
  },
  {
    name: SectionNames.Admin.collaborators,
    labelKey: 'common.collaborators',
  },
  {
    name: SectionNames.Admin.links,
    labelKey: 'landing.links.links',
  },
  // { name: 'dataExport', labelKey: 'common.dataExport' },
]

const Admin: React.FC = () => {
  const { t } = useTranslation()
  const countries = useCountries()
  const user = useUser()
  useInjectSlice({ reducerPath: LinksSliceName, reducer: LinksSlice.reducer })
  const linkClassName = useButtonClassName({ inverse: true, noBorder: true, size: ButtonSize.m })

  if (!Users.isAdministrator(user)) return <Navigate replace to={Routes.Root.path.absolute} />

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="admin-view">
      <div className="admin__page-header">
        <h1 className="admin__page-title">{t('admin.admin')}</h1>
      </div>

      <div className="admin__page-menu">
        {sections.map(({ labelKey, name }) => (
          <NavLink
            key={name}
            className={(navData): string =>
              classNames(linkClassName, 'admin__page-menu-button', {
                disabled: navData.isActive,
              })
            }
            to={name}
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </div>

      <div className="admin__page-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
