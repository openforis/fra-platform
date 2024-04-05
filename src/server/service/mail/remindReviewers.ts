import { createI18nPromise } from 'i18n/i18nFactory'
import { TFunction } from 'i18next'
import { Dates } from 'utils/dates'

import { AreaCode, Areas, AssessmentStatus, Country } from 'meta/area'
import { Assessment, AssessmentName, Cycle, CycleName } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { AreaController } from 'server/controller/area'
import { UserRepository } from 'server/repository/public/user'
import { sendMail } from 'server/service/mail/mail'
import { ProcessEnv } from 'server/utils'

type RecipientAssessmentCycleCountries = {
  user: User
  assessments: Array<{
    assessment: Assessment
    cycle: Cycle
    countries: Array<Country>
  }>
}

type RecordRecipientAssessmentCycleCountries = Record<string, RecipientAssessmentCycleCountries>

const _getCountryUrl = (countryIso: AreaCode, assessmentName: AssessmentName, cycleName: CycleName) => {
  const routeParams = { assessmentName, cycleName, countryIso }
  return `    ${ProcessEnv.appUri}${Routes.CountryHome.generatePath(routeParams)}`
}

const _getLastInReview = (country: Country) => {
  return Dates.format(new Date(country.lastInReview), 'dd MMMM yyyy')
}

const _getCountryName = (country: Country, t: TFunction) => {
  return t(`area.${country.countryIso}.listName`)
}

const _getCountryLink = (assessment: Assessment, cycle: Cycle, country: Country, t: TFunction) => {
  return `<a href="${_getCountryUrl(country.countryIso, assessment.props.name, cycle.name)}">${_getCountryName(
    country,
    t
  )} (${_getLastInReview(country)})</a>`
}

const createMail = async (recipient: RecipientAssessmentCycleCountries) => {
  const { user, assessments } = recipient
  const { t } = await createI18nPromise(Lang.en)
  const to = recipient.user.email
  const htmlStyle = `style="white-space: pre-line; max-width: 100%"`
  const subject = t('email.remindReviewer.subject')

  const messageHeader = t('email.remindReviewer.messageHeader', { recipientName: Users.getFullName(user) })
  const messageFooter = t('email.remindReviewer.messageFooter')

  let messageBodyHTML = ''
  let messageBodyText = ''

  assessments.forEach((entry) => {
    const { assessment, cycle, countries } = entry

    const { name: assessmentName } = assessment.props
    const { name: cycleName } = cycle

    const values = {
      assessmentName: t(`assessment.${assessmentName}`),
      cycleName,
      countries: countries.map((country) => _getCountryName(country, t)).join(', '),
      countryUrls: countries.map((country) => _getCountryUrl(country.countryIso, assessmentName, cycleName)).join('\n'),
      countryLinks: countries.map((country) => _getCountryLink(assessment, cycle, country, t)).join('<br>'),
    }

    messageBodyHTML += t('email.remindReviewer.messageBodyHTML', values)
    messageBodyText += t('email.remindReviewer.messageBodyText', values)
  })

  const text = `${messageHeader}\n\n${messageBodyText}\n\n${messageFooter}`
  const html = `<p ${htmlStyle} >${messageHeader}${messageBodyHTML}${messageFooter}</p>`

  const mail = { to, subject, text, html }

  return mail
}

const getReviewerRecipients = async (props: {
  assessments: Array<Assessment>
}): Promise<RecordRecipientAssessmentCycleCountries> => {
  const { assessments } = props
  const assessmentsByReviewer: RecordRecipientAssessmentCycleCountries = {}

  await Promise.all(
    assessments.map(async (assessment) => {
      return Promise.all(
        assessment.cycles.map(async (cycle) => {
          const countries = await AreaController.getCountries({ assessment, cycle })
          const inReview = countries.filter((country) => {
            const diffInDays = Dates.differenceInDays(new Date(), new Date(country.lastInReview))
            return (
              country.props.status === AssessmentStatus.review &&
              diffInDays > 6 &&
              diffInDays % 7 === 0 &&
              !Areas.isAtlantis(country.countryIso)
            )
          })

          if (!inReview.length) return

          const users = await UserRepository.readCountryUsersByRole({
            countryISOs: inReview.map((c) => c.countryIso),
            cycle,
            roles: UserRoles.getRecipientRoles({ status: AssessmentStatus.review }),
          })

          users.forEach((user) => {
            if (!assessmentsByReviewer[user.email]) {
              assessmentsByReviewer[user.email] = {
                user,
                assessments: [],
              }
            }

            assessmentsByReviewer[user.email].assessments.push({ assessment, cycle, countries: inReview })
          })
        })
      )
    })
  )

  return assessmentsByReviewer
}

export const remindReviewers = async (props: { assessments: Array<Assessment> }) => {
  const { assessments } = props
  const recipients = await getReviewerRecipients({ assessments })

  const emails = await Promise.all(Object.values(recipients).map(createMail))

  await Promise.all(emails.map((email) => sendMail(email)))
}
