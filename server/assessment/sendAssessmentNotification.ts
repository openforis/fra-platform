// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createI18n... Remove this comment to see the full error message
const { createI18nPromise } = require('../../common/i18n/i18nFactory')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendMail'.
const { sendMail } = require('../email/sendMail')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const { getCountry } = require('../country/countryRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const { fetchCountryUsers, fetchAdministrators } = require('../user/userRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nationalCo... Remove this comment to see the full error message
const { nationalCorrespondent, reviewer } = require('../../common/countryRole')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const { assessmentStatus } = require('../../common/assessment')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createMail... Remove this comment to see the full error message
const createMail = async (
  countryIso: any,
  assessment: any,
  user: any,
  loggedInUser: any,
  i18n: any,
  serverUrl: any
) => {
  const country = await getCountry(countryIso)
  const emailLocalizationParameters = {
    country: i18n.t(`area.${country.countryIso}.listName`),
    serverUrl,
    recipientName: user.name,
    status: i18n.t(`assessment.status.${assessment.status}.label`),
    changer: loggedInUser.name,
    assessment: i18n.t(`assessment.${assessment.type}`),
    message: assessment.message,
  }
  return {
    to: user.email,
    subject: i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters),
    text: i18n.t('assessment.statusChangeNotification.textMessage', emailLocalizationParameters),
    html: i18n.t('assessment.statusChangeNotification.htmlMessage', emailLocalizationParameters),
  }
}

const getCountryUsers = async (countryIso: any, roles: any) => {
  const countryUsers = await fetchCountryUsers(countryIso)
  return R.filter((user: any) => R.contains(user.role, roles), countryUsers)
}

const getRecipients = async (countryIso: any, newStatus: any) => {
  switch (newStatus) {
    case assessmentStatus.editing:
      return await getCountryUsers(countryIso, [nationalCorrespondent.role])
    case assessmentStatus.review:
      return await getCountryUsers(countryIso, [reviewer.role])
    case assessmentStatus.approval:
      return await fetchAdministrators()
    case assessmentStatus.accepted:
      return await getCountryUsers(countryIso, [nationalCorrespondent.role, reviewer.role])
    default:
      return []
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendAssess... Remove this comment to see the full error message
const sendAssessmentNotification = async (countryIso: any, assessment: any, loggedInUser: any, serverUrl: any) => {
  const i18n = await createI18nPromise('en')
  const recipients = await getRecipients(countryIso, assessment.status)

  // Can't use forEach or map here, await doesn't work properly
  for (const user of recipients) {
    await sendMail(await createMail(countryIso, assessment, user, loggedInUser, i18n, serverUrl))
  }
}

module.exports.sendAssessmentNotification = sendAssessmentNotification
