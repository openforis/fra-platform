import './UserListFilters.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

// import { roleKeys } from '@common/countryRole'
// import MultiSelect from '@webapp/components/multiSelect'
// // @ts-ignore
// import * as camelize from 'camelize'
import * as R from 'ramda'

import { RoleName } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useFilters } from '@client/store/ui/userManagement/hooks'
import { roleNames } from '@client/pages/Admin/UserManagement/utils/roleNames'

import MultiSelect from '../MultiSelect'
// // @ts-ignore
// import * as snake from 'to-snake-case'

// import CountrySelectionModal from '../../../../app/user/userManagement/edit/countrySelectionModal'

// const roleToValue = (role: any) => camelize(role.toLowerCase())
// const valueToRole = (value: any) => snake(value).toUpperCase()

// const roles = R.map(roleToValue, roleKeys)

// type UsersTableFilterState = any
type Props = any

const UserListFilters: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation()

  const filters = useFilters()

  return (
    <div className="users__table-filter">
      <div className="users__table-filter-title">
        <h3>{t('admin.filter')}</h3>
      </div>

      <div className="users__table-filter-container">
        {/* ROLE */}
        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{t('userManagement.role')}</h4>
          </div>
          <div>
            <MultiSelect
              i18n={i18n}
              localizationPrefix="user.roles"
              values={filters.roles}
              options={roleNames}
              onChange={(values: Array<RoleName>) => {
                dispatch(UserManagementActions.updateRolesFilter(values))
              }}
            />
          </div>
        </div>

        {/* COUNTRY */}
        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{t('admin.country')}</h4>
          </div>
          {/* <div className="multi-select" onClick={() => this.setState({ filterCountryOpen: true })}>
            <div className="multi-select__closed-content">
              {R.isEmpty(filter.countries) ? (
                <span className="multi-select__placeholder">{t('multiSelect.placeholder')}</span>
              ) : (
                filter.countries.map((c: any) => t(`area.${c}.listName`)).join(', ')
              )}
            </div>
          </div> */}

          {R.path(['state', 'filterCountryOpen'], this) ? (
            <>test</>
          ) : // <CountrySelectionModal
          //   i18n={i18n}
          //   countries={countries}
          //   userInfo={userInfo}
          //   headerLabel=""
          //   selection={filter.countries}
          //   unselectableCountries={[]}
          //   onClose={() => this.setState({ filterCountryOpen: false })}
          //   toggleCountry={(country: any) => {
          //     const updateCountries = R.contains(country, filter.countries)
          //       ? R.remove(R.findIndex(R.equals(country), filter.countries), 1, filter.countries)
          //       : R.insert(filter.countries.length, country, filter.countries)

          //     onChange(R.assoc('countries', updateCountries, filter))
          //   }}
          // />
          null}
        </div>
      </div>
    </div>
  )
}

export default UserListFilters
