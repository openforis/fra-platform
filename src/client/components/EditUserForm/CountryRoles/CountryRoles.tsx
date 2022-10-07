import './CountryRoles.scss'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso, Region, RegionCode } from '@meta/area'
import { RoleName, User, UserRole, Users } from '@meta/user'

import { useCountries } from '@client/store/assessment'
import { useAssessment, useCycle, useSecondaryRegion } from '@client/store/assessment/hooks'
import { useUser } from '@client/store/user'
import CountrySelectModal from '@client/components/CountrySelectModal'

import CountryRole from './CountryRole'

// properties used to render ui form fields
const roles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
]

type ModalOptionsProps = {
  open: boolean
  initialSelection: Array<string>
  unselectableCountries: Array<string>
  role: RoleName | null
}

type Props = {
  onChange: (value: Array<Partial<UserRole<RoleName>>>, key: string) => void
  user: User
}

const CountryRoles: React.FC<Props> = (props) => {
  const { user, onChange } = props
  const { i18n } = useTranslation()
  const userInfo = useUser()
  const countries = useCountries()
  const assessment = useAssessment()
  const cycle = useCycle()
  const secondaryRegions = useSecondaryRegion()
  const initialModalState = useMemo(() => {
    return {
      open: false,
      initialSelection: [],
      unselectableCountries: [],
      role: null,
    }
  }, [])
  const [modalOptions, setModalOptions] = useState<ModalOptionsProps>(initialModalState)

  const _onClose = useCallback(
    (selection: Array<string>, role: RoleName) => {
      setModalOptions(initialModalState)

      const selectedRoles = selection.map(
        (countryIso): Partial<UserRole<RoleName>> => ({
          countryIso: countryIso as CountryIso,
          role,
          assessmentId: assessment.id,
          cycleUuid: cycle.uuid,
        })
      )

      onChange(
        [...user.roles.filter(({ role: _role }: UserRole<RoleName>) => _role !== role), ...selectedRoles],
        'roles'
      )
    },
    [assessment.id, cycle.uuid, initialModalState, onChange, user.roles]
  )

  const _toggleAdmin = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(i18n.t('editUser.adminConfirm')))
      onChange(Users.isAdministrator(user) ? [] : [{ countryIso: null, role: RoleName.ADMINISTRATOR }], 'roles')
  }, [i18n, onChange, user])

  return (
    <div className="edit-user__form-item edit-user__form-item-roles">
      <div className="edit-user__form-label">{i18n.t<string>('editUser.role')}</div>
      <div className={`edit-user__form-field edit-user__form-field-roles${Users.validRole(user) ? '' : ' error'}`}>
        {roles.map((role) => {
          const userRoles = user?.roles
          if (!userRoles) return null
          // role section is available to administrators or if user has at least one role and it's not administrator
          const hasCurrentRole = userRoles.some(({ role: _role }: UserRole<RoleName>) => _role === role)
          const shouldShow = !Users.isAdministrator(user) && (Users.isAdministrator(userInfo) || hasCurrentRole)
          if (!shouldShow) return null

          const unselectableCountries = userRoles
            .filter(({ role: _role }) => _role !== role)
            .map(({ countryIso }) => countryIso)

          const initialSelection = userRoles
            .filter(({ role: _role }) => _role === role)
            .map(({ countryIso }) => countryIso)

          const _onClick = () => {
            setModalOptions({
              open: true,
              initialSelection,
              unselectableCountries,
              role,
            })
          }

          return <CountryRole key={role} onClick={_onClick} role={role} user={user} />
        })}

        {Users.isAdministrator(userInfo) && (
          <div
            className="edit-user__form-field-role edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
            onClick={_toggleAdmin}
            aria-hidden="true"
          >
            <div className="role">{i18n.t<string>(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))}</div>
            <div className={`fra-checkbox${Users.isAdministrator(user) ? ' checked' : ''}`} />
          </div>
        )}
      </div>
      <CountrySelectModal
        open={modalOptions.open}
        countries={countries}
        excludedRegions={[RegionCode.FE, RegionCode.AT, ...secondaryRegions.regions.map((r: Region) => r.regionCode)]}
        headerLabel={i18n.t(Users.getI18nRoleLabelKey(modalOptions.role as RoleName))}
        onClose={(selection) => _onClose(selection, modalOptions.role)}
        initialSelection={modalOptions.initialSelection}
        unselectableCountries={modalOptions.unselectableCountries}
        showFooter={false}
      />
    </div>
  )
}

export default CountryRoles
