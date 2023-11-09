/* eslint-disable no-alert */
import './CountryRoles.scss'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CountryIso, Region, RegionCode } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'
import { RoleName, User, UserRole, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCountries, useSecondaryRegion } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import CountrySelectModal from 'client/components/CountrySelectModal'

import CountryRole from './CountryRole'

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

const CountryRoles: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
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

  const _onChange = useCallback(
    (selection: Array<string>, role: RoleName) => {
      const selectedRoles = selection.map(
        (countryIso): Partial<UserRole<RoleName>> => ({
          countryIso: countryIso as CountryIso,
          role,
          assessmentId: assessment.id,
          cycleUuid: cycle.uuid,
        })
      )

      const roles = [...user.roles.filter(({ role: _role }: UserRole<RoleName>) => _role !== role), ...selectedRoles]

      dispatch(
        UserManagementActions.updateUserRoles({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          roles,
          userId: user.id,
        })
      )
    },
    [assessment.id, assessment.props.name, cycle.name, cycle.uuid, dispatch, user.id, user.roles]
  )

  const _toggleAdmin = useCallback(() => {
    if (window.confirm(t(Users.isAdministrator(user) ? 'editUser.demoteToUser' : 'editUser.promoteToAdmin'))) {
      dispatch(UserManagementActions.updateUserAdminRole({ userId: user.id }))
    }
  }, [dispatch, t, user])

  const excludeRegions = useMemo(() => {
    if (assessment.props.name === AssessmentNames.panEuropean) return []
    return [RegionCode.FE, ...secondaryRegions.regions.map((r: Region) => r.regionCode)]
  }, [assessment.props.name, secondaryRegions.regions])

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
            className="edit-user__form-field-role edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
            onClick={_toggleAdmin}
            aria-hidden="true"
          >
            <div className="role">{t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))}</div>
            <div className={classNames('fra-checkbox', { checked: Users.isAdministrator(user) })} />
          </div>
        )}
      </div>

      <CountrySelectModal
        open={modalOptions.open}
        countries={countries}
        excludedRegions={excludeRegions}
        headerLabel={t(Users.getI18nRoleLabelKey(modalOptions.role as RoleName))}
        onClose={() => setModalOptions(initialModalState)}
        initialSelection={modalOptions.initialSelection}
        unselectableCountries={modalOptions.unselectableCountries}
        onChange={(_, selectionUpdate: Array<string>) => _onChange(selectionUpdate, modalOptions.role)}
        showFooter={false}
      />
    </div>
  )
}

export default CountryRoles
