/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './UserListFilters.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso, Region, RegionCode } from '@meta/area'
import { RoleName } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useCountries } from '@client/store/assessment'
import { useSecondaryRegion } from '@client/store/assessment/hooks'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useFilters, useRoleNames } from '@client/store/ui/userManagement/hooks'

import CountrySelectModal from '../CountrySelectModal'
import MultiSelect from '../MultiSelect'

const UserListFilters: React.FC = () => {
  const dispatch = useAppDispatch()
  const roleNames = useRoleNames()
  const { i18n, t } = useTranslation()

  const countries = useCountries()
  const filters = useFilters()
  const secondaryRegions = useSecondaryRegion()

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="users__table-filter">
      <div className="users__table-filter-title">
        <h3>{t('admin.filter')}</h3>
      </div>

      <div className="users__table-filter-container">
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
                dispatch(UserManagementActions.updateFilters({ roles: values }))
              }}
            />
          </div>
        </div>

        <div className="users__table-filter-item">
          <div className="users__table-filter-item-label">
            <h4>{t('admin.country')}</h4>
          </div>
          <div className="multi-select" onClick={() => setModalOpen(true)}>
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
            excludedRegions={[
              RegionCode.FE,
              RegionCode.AT,
              ...secondaryRegions.regions.map((r: Region) => r.regionCode),
            ]}
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
