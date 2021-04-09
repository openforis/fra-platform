import React, { useState } from 'react'
import { administrator, isAdministrator } from '@common/countryRole'
import { useI18n, useUserInfo } from '@webapp/components/hooks'
import { i18nUserRole, validRole } from '@common/userUtils'
import { reviewer, nationalCorrespondent, alternateNationalCorrespondent, collaborator } from '@common/countryRole'
import { useCountries } from '@webapp/store/app'
import { useSecondaryGroupedRegions } from '@webapp/store/app/hooks'
import CountrySelectionModal from '@webapp/components/CountrySelectionModal'
import { FRA } from '@common/assessment/fra'
// properties used to render ui form fields

//     const toggleCountryRole = (countryIso: any, role: any) => {
//       const userRoles = this.state.user.roles

//       const idx = userRoles.x(userRole =>
// userRole.countryIso === countryIso && userRole.role === role
// )
//
//       const newUserRoles =
//         idx >= 0
//           ? // @ts-ignore
//             R.remove(idx, 1, userRoles)
//           : // setting role as administrator, removes all other roles
//           role === administrator.role
//           ? [{ countryIso: null, role }]
//           : // @ts-ignore
//             R.insert(userRoles.length, { countryIso, role }, userRoles)
//       this.setState((prevState: EditUserFormState) => {

//         const newUser = {
//           ...prevState.user,
//           roles: newUserRoles,
//         }

//         return {
//           ...prevState,
//           user: newUser,
//           validation: validate(newUser),
//         }
//       })
//     }

//   }
// }

const roles = [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]

type Props = {
  onChange: (value: any, key: string) => void
  user: any
}
const CountryRole = (props: Props) => {
  const { user, onChange } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const countries: any = useCountries()
  const secondaryRegions = useSecondaryGroupedRegions()
  const initialModalState: any = { open: false, initialSelection: [], unselectableCountries: [], role: '' }
  const [modalOptions, setModalOptions]: any = useState(initialModalState)

  const _onClose = (selection: string[], role: string) => {
    setModalOptions(initialModalState)

    const arr = selection.map((countryIso) => ({
      countryIso,
      role,
      assessment: FRA.type,
    }))

    onChange([...user.roles.filter(({ role: _role }: any) => _role !== role), ...arr], 'roles')
  }

  const _toggleAdmin = () => {
    console.log(isAdministrator(user))
    onChange(isAdministrator(user) ? [] : [{ countryIso: null, role: administrator.role }], 'roles')
  }

  return (
    <div className="edit-user__form-item-roles">
      <div className="edit-user__form-label">{i18n.t('editUser.role')}</div>
      <div className={`edit-user__form-field-roles${validRole(user) ? '' : ' error'}`}>
        {isAdministrator(userInfo) && (
          <div
            className="edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
            onClick={_toggleAdmin}
          >
            <div className="role">{i18n.t('user.roles.administrator')}</div>
            <div className={`fra-checkbox${isAdministrator(user) ? ' checked' : ''}`} />
          </div>
        )}

        {roles.map((role) => {
          const userRoles = user?.roles
          if (!userRoles) return null
          // role section is available to administrators or if user has at least one role and it's not administrator
          const hasCurrentRole = userRoles.some(({ role: _role }: any) => _role === role)
          const shouldShow = !isAdministrator(user) && (isAdministrator(userInfo) || hasCurrentRole)
          if (!shouldShow) return null

          const unselectableCountries = userRoles
            ?.filter(({ role: _role }: any) => _role !== role)
            .map(({ countryIso }: any) => countryIso)

          const initialSelection = userRoles
            ?.filter(({ role: _role }: any) => _role === role)
            .map(({ countryIso }: any) => countryIso)

          const _onClick = () => {
            setModalOptions({
              open: true,
              initialSelection,
              unselectableCountries,
              role,
            })
          }

          return (
            <div key={role} className="edit-user__form-field-role-container validation-error-sensitive-field">
              <div className="edit-user__form-field-role">
                <div className="role">{i18nUserRole(i18n, role)}</div>
                {isAdministrator(userInfo) && (
                  <a className="btn-xs btn-primary" onClick={_onClick}>
                    {i18n.t('description.edit')}
                  </a>
                )}
              </div>

              <div className="edit-user__form-field-role-countries">
                {(user.roles || [])
                  .filter((userRole: any) => userRole.role === role)
                  .map((userRole: any) => (
                    <div key={userRole.countryIso} className="edit-user__form-field-country-box">
                      {i18n.t(`area.${userRole.countryIso}.listName`)}
                    </div>
                  ))}
              </div>
            </div>
          )
        })}
      </div>
      <CountrySelectionModal
        isOpen={modalOptions.open}
        countries={countries}
        excludedRegions={secondaryRegions.regions.map((r: any) => r.regionCode)}
        headerLabel={i18nUserRole(i18n, modalOptions.role)}
        onClose={(selection) => _onClose(selection, modalOptions.role)}
        initialSelection={modalOptions.initialSelection}
        unselectableCountries={modalOptions.unselectableCountries}
      />
    </div>
  )
}

export default CountryRole
