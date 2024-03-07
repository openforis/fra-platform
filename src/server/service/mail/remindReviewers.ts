import { createI18nPromise } from 'i18n/i18nFactory'
import { Dates } from 'utils/dates'

import { AssessmentStatus, Country, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { UserRepository } from 'server/repository/public/user'
import { sendMail } from 'server/service/mail/mail'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

type CreateMailProps = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  recipient: User
}

const createMail = async (props: CreateMailProps) => {
  const { recipient, assessment, cycle, country } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = country

  const { t } = await createI18nPromise(Lang.en)

  const routeParams = { assessmentName, cycleName, countryIso }
  const countryUrl = `${ProcessEnv.appUri}${Routes.CountryHome.generatePath(routeParams)}`

  const lastInReview = Dates.format(new Date(country.lastInReview), 'dd MMMM yyyy')

  const values = {
    assessmentName: t(`assessment.${assessmentName}`),
    cycleName,
    country: t(`area.${countryIso}.listName`),

    countryUrl,
    recipientName: Users.getFullName(recipient),
    lastInReview,
  }

  const to = recipient.email

  const subject = t('email.remindReviewer.subject', values)
  const text = t('email.remindReviewer.textMessage', values)
  const htmlStyle = `style="white-space: pre-line; max-width: 100%"`
  const html = `<p ${htmlStyle} >${t('email.remindReviewer.htmlMessage', values)}</p>`
  return { to, subject, text, html }
}

const getRecipients = async (props: { cycle: Cycle; countryIso: CountryIso }) => {
  const { countryIso, cycle } = props
  const roles = UserRoles.getRecipientRoles({ status: AssessmentStatus.review })

  return UserRepository.readCountryUsersByRole({ countryISOs: [countryIso], cycle, roles })
}

export const remindReviewers = async (props: { assessment: Assessment; cycle: Cycle; country: Country }) => {
  const { assessment, cycle, country } = props

  const recipients = await getRecipients({ cycle, countryIso: country.countryIso })
  const vars = `${assessment.props.name} ${cycle.name}  ${country.countryIso}`
  Logger.debug(`[remindReviewers] ${vars} reminding ${recipients.length} reviewers`)

  const callbackFn = async (recipient: User) => createMail({ recipient, assessment, cycle, country })
  const emails = await Promise.all(recipients.map(callbackFn))
  await Promise.all(emails.map((email) => sendMail(email)))
}
