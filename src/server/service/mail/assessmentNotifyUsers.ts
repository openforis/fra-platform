import { createI18nPromise } from 'i18n/i18nFactory'
import { Arrays } from 'utils/arrays'

import { AssessmentStatus, Country, CountryIso } from 'meta/area'
import { AssessmentName, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { Routes } from 'meta/routes'
import { RoleName, User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { UserRepository } from 'server/repository/public/user'
import { ProcessEnv } from 'server/utils'

import { sendMail } from './mail'

type CreateMailProps = {
  status: AssessmentStatus
  user: User
  recipient: User
  url: string
  message: string
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
}
const createMail = async (props: CreateMailProps) => {
  const { assessmentName, countryIso, cycleName, user, url, status, recipient, message } = props

  const i18n = await createI18nPromise(recipient.props.lang ?? Lang.en)

  const serverUrl = `${url}${Routes.Country.generatePath({ assessmentName, countryIso, cycleName })}`

  const emailLocalizationParameters = {
    country: i18n.t(`area.${countryIso}.listName`),
    serverUrl,
    recipientName: Users.getFullName(recipient),
    status: i18n.t(`assessment.status.${status}.label`),
    changer: Users.getFullName(user),
    assessment: i18n.t(`assessment.${assessmentName}`),
    message,
  }

  const to = recipient.email

  const subject = i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters)
  const text = i18n.t('assessment.statusChangeNotification.textMessage', emailLocalizationParameters)
  const htmlStyle = `style="white-space: pre-line; max-width: 100%"`
  const html = `<p ${htmlStyle} >${i18n.t(
    'assessment.statusChangeNotification.htmlMessage',
    emailLocalizationParameters
  )}</p>`

  const mail = { to, subject, text, html }
  return mail
}

const getCountryUsers = async (props: {
  countryISOs: Array<CountryIso>
  cycle: Cycle
  roles: Array<RoleName>
}): Promise<Array<User>> => {
  const { countryISOs, cycle, roles } = props

  return UserRepository.readCountryUsersByRole({ countryISOs, cycle, roles })
}

const getRecipients = async (props: {
  countryISOs: Array<CountryIso>
  cycle: Cycle
  status: AssessmentStatus
  notifySelf: boolean
  notifyUsers: boolean
  user: User
}) => {
  const { countryISOs, status, cycle, notifySelf, notifyUsers, user } = props
  if (!notifyUsers) {
    return notifySelf ? [user] : []
  }

  const roles = UserRoles.getRecipientRoles({ status })

  const recipientsPromise = getCountryUsers({ cycle, countryISOs, roles })
  const adminsPromise = roles.includes(RoleName.ADMINISTRATOR) ? UserRepository.getAdmins() : undefined
  const [recipients, admins = []] = await Promise.all([recipientsPromise, adminsPromise])

  let uniqueRecipients: User[] = Arrays.uniqueBy([...recipients, ...(admins ?? [])], 'id')

  if (!notifySelf) {
    uniqueRecipients = uniqueRecipients.filter((recipient) => recipient.id !== user.id)
  } else if (!uniqueRecipients.some((recipient) => recipient.id === user.id)) {
    uniqueRecipients.push(user)
  }

  return uniqueRecipients
}

export const assessmentNotifyUsers = async (props: {
  user: User
  country: Country
  message: string
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycle: Cycle
  notifySelf: boolean
  notifyUsers: boolean
}) => {
  const {
    user,
    country: {
      props: { status },
    },
    message,
    assessmentName,
    countryIso,
    cycle,
    notifySelf,
    notifyUsers,
  } = props

  const recipients = await getRecipients({ cycle, countryISOs: [countryIso], status, notifySelf, notifyUsers, user })
  const emailPromises = recipients.map(async (recipient: User) => {
    return createMail({
      user,
      url: ProcessEnv.appUri,
      recipient,
      status,
      assessmentName,
      countryIso,
      cycleName: cycle.name,
      message,
    })
  })

  const emails = await Promise.all(emailPromises)

  const sendMailPromises = emails.map((email) => sendMail(email))

  await Promise.all(sendMailPromises)
}
