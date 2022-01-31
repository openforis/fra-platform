// import { User, UserResetPassword } from '@meta/user'
// import { createI18nPromise } from '@i18n/i18nFactory'
// import { sendMail } from '@server/service/mail/mail'
// import { CountryIso } from '@meta/area'
//
import { CountryIso } from '@meta/area'
import { RoleName, User } from '@meta/user'
import { createI18nPromise } from '@i18n/i18nFactory'
import { AssessmentName, AssessmentStatus, CountryStatus } from '@meta/assessment'
import { UserRepository } from '@server/repository'

export const createMail = async (props: {
  countryIso: CountryIso
  countryStatus: CountryStatus
  user: User
  recipient: User
  url: string
  message: string
  assessmentName: AssessmentName
}) => {
  const { assessmentName, user, url, countryStatus, countryIso, recipient, message } = props
  const i18n = await createI18nPromise(recipient.lang ?? 'en')

  const emailLocalizationParameters = {
    country: i18n.t(`area.${countryIso}.listName`),
    serverUrl: url,
    recipientName: recipient.name,
    status: i18n.t(`assessment.status.${countryStatus.status}.label`),
    changer: user.name,
    assessment: i18n.t(`assessment.${assessmentName}`),
    message,
  }

  return {
    to: user.email,
    subject: i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters),
    text: i18n.t('assessment.statusChangeNotification.textMessage', emailLocalizationParameters),
    html: i18n.t('assessment.statusChangeNotification.htmlMessage', emailLocalizationParameters),
  }
}

const getCountryUsers = async (props: {
  countryISOs: Array<CountryIso>
  roles: Array<RoleName>
}): Promise<Array<User>> => {
  const { countryISOs, roles } = props

  return UserRepository.readCountryUsersByRole({ countryISOs, roles })
}

const getRecipients = async (props: { countryISOs: Array<CountryIso>; countryStatus: CountryStatus }) => {
  const { countryISOs, countryStatus } = props

  switch (countryStatus.status) {
    case AssessmentStatus.editing:
      return getCountryUsers({ countryISOs, roles: [RoleName.NATIONAL_CORRESPONDENT] })
    case AssessmentStatus.review:
      return getCountryUsers({ countryISOs, roles: [RoleName.REVIEWER] })
    case AssessmentStatus.approval:
      return getCountryUsers({ countryISOs, roles: [RoleName.ADMINISTRATOR] })
    case AssessmentStatus.accepted:
      return getCountryUsers({ countryISOs, roles: [RoleName.REVIEWER, RoleName.NATIONAL_CORRESPONDENT] })
    default:
      return []
  }
}

export const assessmentNotifyUsers = async (props: {
  countryIso: CountryIso
  user: User
  countryStatus: CountryStatus
  url: string
  message: string
  assessmentName: AssessmentName
}) => {
  const { countryIso, user, countryStatus, url, message, assessmentName } = props
  const recipients = await getRecipients({ countryISOs: [countryIso], countryStatus })
  console.log(recipients, url)
  const emails = recipients.map(async (recipient: User) => {
    return createMail({
      user,
      url,
      recipient,
      countryStatus,
      countryIso,
      assessmentName,
      message,
    })
  })

  const xx = await Promise.all(emails)
  console.log({ xx })

  //   const emailLocalizationParameters = {
  //     country: i18n.t(`area.${countryIso}.listName`),
  //     serverUrl,
  //     recipientName: user.name,
  //     status: i18n.t(`assessment.status.${assessment.status}.label`),
  //     changer: loggedInUser.name,
  //     assessment: i18n.t(`assessment.${assessment.type}`),
  //     message: assessment.message,
  //   }
  //   return {
  //     to: user.email,
  //     subject: i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters),
  //     text: i18n.t('assessment.statusChangeNotification.textMessage', emailLocalizationParameters),
  //     html: i18n.t('assessment.statusChangeNotification.htmlMessage', emailLocalizationParameters),
  //   }
  //
  //   const resetPasswordEmail = {
  //     to: user.email,
  //     subject: i18n.t('user.resetPasswordEmail.subject'),
  //     text: i18n.t('user.resetPasswordEmail.htmlMessage', {
  //       link,
  //       url,
  //     }),
  //     html: i18n.t('user.resetPasswordEmail.htmlMessage', {
  //       link,
  //       url,
  //     }),
  //   }
  //   await sendMail(resetPasswordEmail)
}
