import './UserListFilters.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCountries, useExcludedRegions } from 'client/store/area'
import { useFilters, UserManagementActions, useRoleNames } from 'client/store/ui/userManagement'

import CountrySelectModal from '../CountrySelectModal'
import MultiSelect from '../MultiSelect'

const UserListFilters: React.FC = () => {
  const dispatch = useAppDispatch()
  const roleNames = useRoleNames()
  const { t } = useTranslation()

  const countries = useCountries()
  const filters = useFilters()

  const [modalOpen, setModalOpen] = useState(false)

  const excludeRegions = useExcludedRegions()

  return (
    <div className="users__table-filter">
      <div className="users__table-filter-title">
        <h3>{t('admin.filter')}</h3>
      </div>

      <div className="users__table-filter-container">
        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{t('common.name')}</h4>
          </div>
          <div>
            <input
              type="text"
              defaultValue={filters.fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(UserManagementActions.updateFilters({ fullName: e.target.value.trim() }))
              }
            />
          </div>
        </div>

        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{t('common.role')}</h4>
          </div>
          <div>
            <MultiSelect
              values={filters.roles}
              options={roleNames.map((roleName: RoleName) => ({ value: roleName, label: `user.roles.${roleName}` }))}
              onChange={(values: Array<RoleName>) => {
                dispatch(UserManagementActions.updateFilters({ roles: values }))
              }}
            />
          </div>
        </div>

        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{t('common.country')}</h4>
          </div>
          <div className="multi-select" onClick={() => setModalOpen(true)} aria-hidden="true">
            <div className="multi-select__closed-content">
              {filters.countries.length === 0 ? (
                <span className="multi-select__placeholder">{t('multiSelect.placeholder')}</span>
              ) : (
                filters.countries.map((countryIso: CountryIso) => t(`area.${countryIso}.listName`)).join(', ')
              )}
            </div>
          </div>

          <CountrySelectModal
            open={modalOpen}
            countries={countries}
            excludedRegions={excludeRegions}
            headerLabel={t('common.select')}
            initialSelection={filters.countries}
            onClose={(selectionUpdate: Array<string>) => {
              dispatch(UserManagementActions.updateFilters({ countries: selectionUpdate }))
              setModalOpen(false)
            }}
            showFooter={false}
          />
        </div>
      </div>
    </div>
  )
}

export default UserListFilters
