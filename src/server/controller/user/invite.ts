import { CountryIso } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UserInvitationForm } from 'meta/form/userInvitation/form'
import { User, UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { MailService } from 'server/service'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  user: User
  userInvitation: UserInvitationForm
}

type Returned = { userInvitation: UserInvitation; user: User }

const _getOrCreateUserToInvite = async (props: UserInvitationForm, client: BaseProtocol): Promise<User> => {
  const { email, language, name, surname } = props

  // Get user with primary email
  let userToInvite: User = await UserRepository.getOne({ email }, client)
  // If user with primary email not found, check if user has active google login
  if (!userToInvite) userToInvite = await UserRepository.getOne({ emailGoogle: email }, client)
  // If neither of above, create new user
  if (!userToInvite) {
    const user = { email, props: { name, surname, lang: language } }
    userToInvite = await UserRepository.create({ user }, client)
  }
  return userToInvite
}

export const invite = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, countryIso, cycle, user, userInvitation: userInvitationForm } = props

  return client.tx(async (t) => {
    let userToInvite
    try {
      userToInvite = await _getOrCreateUserToInvite(userInvitationForm, t)
    } catch (error) {
      if (error.constraint === 'users_email_key') throw new Error('error.userInvitation.userIsDisabled')
      throw error
    }

    const userInvitationProps = {
      assessment,
      countryIso,
      cycle,
      invitedBy: user,
      permissions: userInvitationForm.permissions,
      role: userInvitationForm.role,
      user: userToInvite,
    }

    let userInvitation: UserInvitation
    try {
      userInvitation = await UserInvitationRepository.create(userInvitationProps, t)
    } catch (error) {
      const constraint = 'users_invitation_assessment_cycle_country_uindex'
      if (error.constraint === constraint) throw new Error('error.userInvitation.userAlreadyRoleInCountry')
      throw error
    }

    const { role, userUuid } = userInvitation

    const target = { userUuid, user: userToInvite.props.name, role }
    const message = ActivityLogMessage.invitationAdd
    const section = 'users'
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const mailProps = { countryIso, assessmentName, cycleName, userInvitation, userToInvite }
    await MailService.userInvite(mailProps)

    return { userInvitation, user: userToInvite }
  })
}
