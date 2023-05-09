import { createI18nPromise } from '@i18n/i18nFactory'

import { ClientRoutes } from '@meta/app'
import { Country, CountryIso } from '@meta/area'
import { AssessmentStatus } from '@meta/area/country'
import { AssessmentName, Cycle } from '@meta/assessment'
import { RoleName, User, Users } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { UserRepository } from '@server/repository/public/user'

import { sendMail } from './mail'

const createMail = async (props: {
  status: AssessmentStatus
  user: User
  recipient: User
  url: string
  message: string
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
}) => {
  const { assessmentName, countryIso, cycleName, user, url, status, recipient, message } = props

  const i18n = await createI18nPromise(recipient.props.lang ?? 'en')

  const link = `${url}${ClientRoutes.Assessment.Cycle.Country.Landing.getLink({
    assessmentName,
    countryIso,
    cycleName,
  })}`

  const emailLocalizationParameters = {
    country: i18n.t(`area.${countryIso}.listName`),
    serverUrl: link,
    recipientName: Users.getFullName(recipient),
    status: i18n.t(`assessment.status.${status}.label`),
    changer: Users.getFullName(user),
    assessment: i18n.t(`assessment.${assessmentName}`),
    message,
  }

  return {
    to: recipient.email,
    subject: i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters),
    text: i18n.t('assessment.statusChangeNotification.textMessage', emailLocalizationParameters),
    html: i18n.t('assessment.statusChangeNotification.htmlMessage', emailLocalizationParameters),
  }
}

const getCountryUsers = async (props: {
  countryISOs: Array<CountryIso>
  cycle: Cycle
  roles: Array<RoleName>
}): Promise<Array<User>> => {
  const { countryISOs, cycle, roles } = props

  return UserRepository.readCountryUsersByRole({ countryISOs, cycle, roles })
}

const getRecipients = async (props: { countryISOs: Array<CountryIso>; cycle: Cycle; status: AssessmentStatus }) => {
  const { countryISOs, status, cycle } = props
  const roles = UserRoles.getRecipientRoles({ status })
  return getCountryUsers({ cycle, countryISOs, roles })
}

export const assessmentNotifyUsers = async (props: {
  user: User
  country: Country
  message: string
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycle: Cycle
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
  } = props
  const recipients = await getRecipients({ cycle, countryISOs: [countryIso], status })

  const emailPromises = recipients.map(async (recipient: User) => {
    return createMail({
      user,
      url: process.env.APP_URI,
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
