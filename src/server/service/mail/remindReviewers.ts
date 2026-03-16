import { TFunction } from 'i18next'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { Routes } from 'meta/routes/routes'
import { UserRoles } from 'meta/user/roles'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import { AreaController } from 'server/controller/area'
import { UserRepository } from 'server/db/repository/public/user'
import { sendMail } from 'server/service/mail/mail'
import { I18n, ProcessEnv } from 'server/utils'

type RecipientAssessmentCycleCountries = {
  user: User
  assessments: Array<{
    assessment: Assessment
    cycle: Cycle
    countries: Array<Country>
  }>
}

type RecordRecipientAssessmentCycleCountries = Record<string, RecipientAssessmentCycleCountries>

const _getCountryUrl = (countryIso: AreaCode, assessmentName: AssessmentName, cycleName: CycleName): string => {
  const routeParams = { assessmentName, cycleName, countryIso }
  return `    ${ProcessEnv.appUri}${Routes.CountryHome.generatePath(routeParams)}`
}

const _getLastInReview = (country: Country): string => {
  return Dates.format(new Date(country.lastInReview), 'dd MMMM yyyy')
}

const _getCountryName = (country: Country, t: TFunction): string => {
  return t(`area.${country.countryIso}.listName`)
}

const _getCountryLink = (assessment: Assessment, cycle: Cycle, country: Country, t: TFunction): string => {
  return `<a href="${_getCountryUrl(country.countryIso, assessment.props.name, cycle.name)}">${_getCountryName(
    country,
    t
  )} (${_getLastInReview(country)})</a>`
}

const createMail = async (
  recipient: RecipientAssessmentCycleCountries
): Promise<{ html: string; subject: string; text: string; to: string }> => {
  const { assessments, user } = recipient
  const { t } = await I18n.getInstance({ user })
  const to = recipient.user.email
  const htmlStyle = `style="white-space: pre-line; max-width: 100%"`
  const subject = t('email.remindReviewer.subject')

  const messageHeader = t('email.remindReviewer.messageHeader', { recipientName: Users.getFullName(user) })
  const messageFooter = t('email.remindReviewer.messageFooter')

  let messageBodyHTML = ''
  let messageBodyText = ''

  assessments.forEach((entry) => {
    const { assessment, countries, cycle } = entry

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

  return { to, subject, text, html }
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
          if (cycle.props.disabledReviewerEmailReminders) return

          const countries = await AreaController.getCountries({ assessment, cycle })
          const inReview = countries.filter((country) => {
            const { lastInReview } = country

            if (Objects.isNil(lastInReview)) return false

            const diffInDays = Dates.differenceInDays(new Date(), new Date(lastInReview))
            return (
              country.props.status === CountryStatus.review &&
              diffInDays > 6 &&
              diffInDays % 7 === 0 &&
              !Areas.isAtlantis(country.countryIso)
            )
          })

          if (!inReview.length) return

          const users = await UserRepository.readCountryUsersByRole({
            countryISOs: inReview.map((c) => c.countryIso),
            cycle,
            roles: UserRoles.getRecipientRoles({ status: CountryStatus.review }),
          })

          users.forEach((user) => {
            if (!assessmentsByReviewer[user.email]) {
              assessmentsByReviewer[user.email] = {
                user,
                assessments: [],
              }
            }
            const userCountries = inReview.filter((country) => Users.isReviewer(user, country.countryIso, cycle))
            assessmentsByReviewer[user.email].assessments.push({ assessment, cycle, countries: userCountries })
          })
        })
      )
    })
  )

  return assessmentsByReviewer
}

export const remindReviewers = async (props: { assessments: Array<Assessment> }): Promise<void> => {
  const { assessments } = props
  const recipients = await getReviewerRecipients({ assessments })

  const emails = await Promise.all(Object.values(recipients).map(createMail))

  await Promise.all(emails.map((email) => sendMail(email)))
}
