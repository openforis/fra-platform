/* eslint-disable no-alert */
import './CountryRoles.scss'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { RoleName, User, UserRole, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCountries, useExcludedRegions } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import CountrySelectModal from 'client/components/CountrySelectModal'

import CountryRole from './CountryRole'

/*
  This component is used by admins when setting or removing multiple roles
 */

// properties used to render ui form fields
const roles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

type ModalOptionsProps = {
  open: boolean
  initialSelection: Array<string>
  unselectableCountries: Array<string>
  role: RoleName | null
}

/**
 * @deprecated
 * Deprecation notice: EditUserForm is scheduled for refactor in #3810
 */
const CountryRoles: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const userInfo = useUser()
  const countries = useCountries()
  const assessment = useAssessment()
  const cycle = useCycle()
  const excludeRegions = useExcludedRegions()

  const initialModalState = useMemo(() => {
    return {
      open: false,
      initialSelection: [],
      unselectableCountries: [],
      role: null,
    }
  }, [])
  const [modalOptions, setModalOptions] = useState<ModalOptionsProps>(initialModalState)

  const _onChange = useCallback(
    (selection: Array<string>, role: RoleName) => {
      const selectedRoles = selection.map(
        (countryIso): Partial<UserRole<RoleName>> => ({
          countryIso: countryIso as CountryIso,
          role,
          assessmentUuid: assessment.uuid,
          cycleUuid: cycle.uuid,
        })
      )

      const roles = [...user.roles.filter(({ role: _role }: UserRole<RoleName>) => _role !== role), ...selectedRoles]

      dispatch(
        UserManagementActions.updateUserRoles({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          roles,
          userUuid: user.uuid,
        })
      )
    },
    [assessment.props.name, assessment.uuid, cycle.name, cycle.uuid, dispatch, user.roles, user.uuid]
  )

  const _toggleAdmin = useCallback(() => {
    if (window.confirm(t(Users.isAdministrator(user) ? 'editUser.demoteToUser' : 'editUser.promoteToAdmin'))) {
      dispatch(UserManagementActions.updateUserAdminRole({ userUuid: user.uuid }))
    }
  }, [dispatch, t, user])

  return (
    <div className="edit-user__form-item edit-user__form-item-roles">
      <div className="edit-user__form-label">{t('editUser.role')}</div>
      <div
        className={classNames('edit-user__form-field', 'edit-user__form-field-roles', {
          error: !Users.validRole(user),
        })}
      >
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
            aria-hidden="true"
            className="edit-user__form-field-role edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
            onClick={_toggleAdmin}
          >
            <div className="role">{t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))}</div>
            <div className={classNames('fra-checkbox', { checked: Users.isAdministrator(user) })} />
          </div>
        )}
      </div>

      <CountrySelectModal
        countries={countries}
        excludedRegions={excludeRegions}
        headerLabel={t(Users.getI18nRoleLabelKey(modalOptions.role as RoleName))}
        initialSelection={modalOptions.initialSelection}
        onChange={(_, selectionUpdate: Array<string>) => _onChange(selectionUpdate, modalOptions.role)}
        onClose={() => setModalOptions(initialModalState)}
        open={modalOptions.open}
        showFooter={false}
        unselectableCountries={modalOptions.unselectableCountries}
      />
    </div>
  )
}

export default CountryRoles
