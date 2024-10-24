import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { RoleName, User, UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { MailService } from 'server/service'

type UserProps = {
  email: string
  name?: string
  surname?: string
  lang: Lang
}

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  user: User
  roleName: RoleName
} & UserProps

type Returned = { userInvitation: UserInvitation; user: User }

const _getOrCreateUserToInvite = async (props: UserProps, client: BaseProtocol): Promise<User> => {
  const { email, email: emailGoogle, name, surname, lang } = props

  // Get user with primary email
  let userToInvite: User = await UserRepository.getOne({ email }, client)
  // If user with primary email not found, check if user has active google login
  if (!userToInvite) userToInvite = await UserRepository.getOne({ emailGoogle }, client)
  // If neither of above, create new user
  if (!userToInvite) {
    const user = { email, props: { name, surname, lang } }
    userToInvite = await UserRepository.create({ user }, client)
  }
  return userToInvite
}

export const invite = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle, countryIso, email, lang, name, roleName, surname, user } = props

  return client.tx(async (t) => {
    const userToInvite = await _getOrCreateUserToInvite({ email, name, surname, lang }, t)

    const userInvitationProps = { assessment, countryIso, cycle, invitedBy: user, role: roleName, user: userToInvite }
    const userInvitation: UserInvitation = await UserInvitationRepository.create(userInvitationProps, t)

    const { userUuid, role } = userInvitation

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
