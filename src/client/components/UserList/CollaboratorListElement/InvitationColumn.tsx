import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User, UserRole, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'
import UserInvitationInfo from 'client/components/UserList/UserInvitationInfo'

interface Props {
  invitationUuid: string
  userRole: UserRole<RoleName, any>
  user: User
}

const InvitationColumn: React.FC<Props> = (props: Props) => {
  const { invitationUuid, userRole, user } = props

  const [showInvitationInfo, setShowInvitationInfo] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycle = useCycle()
  const cycleName = cycle.name
  const countryIso = useCountryIso()
  const currentUser = useUser()

  const removeInvitation = useCallback(() => {
    if (window.confirm(t('userManagement.confirmDelete', { user: Users.getFullName(user) })))
      dispatch(
        UserManagementActions.removeInvitation({
          assessmentName,
          cycleName,
          countryIso,
          invitationUuid,
        })
      ).then(() => {
        toaster.success(t('userManagement.invitationDeleted'))
      })
  }, [t, user, dispatch, assessmentName, cycleName, countryIso, invitationUuid, toaster])

  const inviteAgain = useCallback(() => {
    dispatch(
      UserManagementActions.sendInvitationEmail({
        assessmentName,
        countryIso,
        cycleName,
        invitationUuid,
      })
    ).then(() => {
      toaster.success(t('userManagement.invitationEmailSent'))
    })
  }, [dispatch, assessmentName, countryIso, cycleName, invitationUuid, toaster, t])

  if (UserRoles.isInvitationExpired(userRole))
    return (
      <button className="btn-s btn-link" onClick={inviteAgain} title={t('userManagement.inviteAgain')} type="button">
        {t('userManagement.inviteAgain')}
        <Icon className="icon-sub" name="icon-paper-plane" />
      </button>
    )

  return (
    <>
      <button
        key={0}
        className="btn-s btn-link"
        onClick={() => setShowInvitationInfo(true)}
        title={t('userManagement.info')}
        type="button"
      >
        <Icon name="round-e-info" />
      </button>

      <button
        key={1}
        className="btn-s btn-link-destructive"
        disabled={currentUser.id === user.id}
        onClick={removeInvitation}
        title={t('userManagement.remove')}
        type="button"
      >
        <Icon name="trash-simple" />
      </button>
      {showInvitationInfo ? <UserInvitationInfo user={user} onClose={() => setShowInvitationInfo(false)} /> : null}
    </>
  )
}

export default InvitationColumn
