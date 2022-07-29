import './CountryRoles.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

// import { FRA } from '@core/assessment'
// import CountrySelectModal from '@webapp/components/CountrySelectModal'
// import { useCountries } from '@webapp/store/app'
// import { useSecondaryGroupedRegions } from '@webapp/store/app/hooks'
import { RoleName, User, UserRole, Users } from '@meta/user'

import { useUser } from '@client/store/user'

// properties used to render ui form fields
const roles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
]

type Props = {
  onChange: (value: Array<Partial<UserRole<RoleName>>>, key: string) => void
  user: User
}
const CountryRole = (props: Props) => {
  const { user, onChange } = props
  const { i18n } = useTranslation()
  const userInfo = useUser()
  //   const countries: any = useCountries()
  //   const secondaryRegions = useSecondaryGroupedRegions()
  //   const initialModalState: any = { open: false, initialSelection: [], unselectableCountries: [], role: '' }
  //   const [modalOptions, setModalOptions]: any = useState(initialModalState)

  //   const _onClose = (selection: string[], role: string) => {
  //     setModalOptions(initialModalState)

  //     const arr = selection.map((countryIso) => ({
  //       countryIso,
  //       role,
  //       assessment: FRA.type,
  //     }))

  //     onChange([...user.roles.filter(({ role: _role }: any) => _role !== role), ...arr], 'roles')
  //   }

  const _toggleAdmin = () => {
    onChange(Users.isAdministrator(user) ? [] : [{ countryIso: null, role: RoleName.ADMINISTRATOR }], 'roles')
  }

  return (
    <div className="edit-user__form-item-roles">
      <div className="edit-user__form-label">{i18n.t<string>('editUser.role')}</div>
      <div className={`edit-user__form-field-roles${Users.validRole(user) ? '' : ' error'}`}>
        {Users.isAdministrator(userInfo) && (
          <div
            className="edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
            onClick={_toggleAdmin}
            aria-hidden="true"
          >
            <div className="role">{i18n.t<string>(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))}</div>
            <div className={`fra-checkbox${Users.isAdministrator(user) ? ' checked' : ''}`} />
          </div>
        )}

        {roles.map((role) => {
          const userRoles = user?.roles
          if (!userRoles) return null
          // role section is available to administrators or if user has at least one role and it's not administrator
          const hasCurrentRole = userRoles.some(({ role: _role }: UserRole<RoleName>) => _role === role)
          const shouldShow = !Users.isAdministrator(user) && (Users.isAdministrator(userInfo) || hasCurrentRole)
          if (!shouldShow) return null

          //   const unselectableCountries = userRoles
          //     .filter(({ role: _role }: any) => _role !== role)
          //     .map(({ countryIso }: any) => countryIso)

          //   const initialSelection = userRoles
          //     .filter(({ role: _role }: any) => _role === role)
          //     .map(({ countryIso }: any) => countryIso)

          const _onClick = () => {
            //     setModalOptions({
            //       open: true,
            //       initialSelection,
            //       unselectableCountries,
            //       role,
            //     })
          }

          return (
            <div key={role} className="edit-user__form-field-role-container validation-error-sensitive-field">
              <div className="edit-user__form-field-role">
                <div className="role">{i18n.t<string>(Users.getI18nRoleLabelKey(role))}</div>
                {Users.isAdministrator(userInfo) && (
                  <button className="btn-xs btn-primary" onClick={_onClick} type="button">
                    {i18n.t<string>('description.edit')}
                  </button>
                )}
              </div>

              <div className="edit-user__form-field-role-countries">
                {(user.roles || [])
                  .filter((userRole: UserRole<RoleName>) => userRole.role === role)
                  .map((userRole: UserRole<RoleName>) => (
                    <div key={userRole.countryIso} className="edit-user__form-field-country-box">
                      {i18n.t<string>(`area.${userRole.countryIso}.listName`)}
                    </div>
                  ))}
              </div>
            </div>
          )
        })}
      </div>
      {/* <CountrySelectModal
        open={modalOptions.open}
        countries={countries}
        excludedRegions={secondaryRegions.regions.map((r: any) => r.regionCode)}
        headerLabel={i18nUserRole(i18n, modalOptions.role)}
        onClose={(selection) => _onClose(selection, modalOptions.role)}
        initialSelection={modalOptions.initialSelection}
        unselectableCountries={modalOptions.unselectableCountries}
      /> */}
    </div>
  )
}

export default CountryRole
