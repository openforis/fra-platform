import './usersTableFilter.less'

import React from 'react'
import * as R from 'ramda'
// @ts-ignore
import * as camelize from 'camelize'
// @ts-ignore
import * as snake from 'to-snake-case'

import MultiSelect from '@webapp/components/multiSelect'
import { roleKeys } from '@common/countryRole'
import CountrySelectionModal from '../../../../app/user/userManagement/edit/countrySelectionModal'

const roleToValue = (role: any) => camelize(role.toLowerCase())
const valueToRole = (value: any) => snake(value).toUpperCase()

const roles = R.map(roleToValue, roleKeys)

type UsersTableFilterState = any
type Props = any
class UsersTableFilter extends React.Component<Props, UsersTableFilterState> {
  props: Props
  render() {
    const { i18n, userInfo, filter, onChange, countries } = this.props

    return (
      <div className="users__table-filter">
        <div className="users__table-filter-title">
          <h3>{i18n.t('admin.filter')}</h3>
        </div>

        <div className="users__table-filter-container">
          {/* ROLE */}
          <div className="users__table-filter-item">
            <div className="users__table-filter-item-label">
              <h4>{i18n.t('userManagement.role')}</h4>
            </div>
            <div>
              <MultiSelect
                i18n={i18n}
                localizationPrefix="user.roles"
                values={filter.roles.map(roleToValue)}
                options={roles}
                onChange={(values: any) => onChange(R.assoc('roles', values.map(valueToRole), filter))}
              />
            </div>
          </div>

          {/* COUNTRY */}
          <div className="users__table-filter-item">
            <div className="users__table-filter-item-label">
              <h4>{i18n.t('admin.country')}</h4>
            </div>
            <div className="multi-select" onClick={() => this.setState({ filterCountryOpen: true })}>
              <div className="multi-select__closed-content">
                {R.isEmpty(filter.countries) ? (
                  <span className="multi-select__placeholder">{i18n.t('multiSelect.placeholder')}</span>
                ) : (
                  filter.countries.map((c: any) => i18n.t(`area.${c}.listName`)).join(', ')
                )}
              </div>
            </div>

            {R.path(['state', 'filterCountryOpen'], this) ? (
              <CountrySelectionModal
                i18n={i18n}
                countries={countries}
                userInfo={userInfo}
                headerLabel=""
                selection={filter.countries}
                unselectableCountries={[]}
                onClose={() => this.setState({ filterCountryOpen: false })}
                toggleCountry={(country: any) => {
                  const updateCountries = R.contains(country, filter.countries)
                    ? R.remove(R.findIndex(R.equals(country), filter.countries), 1, filter.countries)
                    : R.insert(filter.countries.length, country, filter.countries)

                  onChange(R.assoc('countries', updateCountries, filter))
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default UsersTableFilter
