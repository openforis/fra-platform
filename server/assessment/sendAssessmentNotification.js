const R = require('ramda')
const {createI18nPromise} = require('../../common/i18n/i18nFactory')
const {sendMail} = require('../email/sendMail')
const {getCountry} = require('../country/countryRepository')
const {fetchCountryUsers, fetchAdministrators} = require('../user/userRepository')
const {nationalCorrespondent, reviewer} = require('../../common/countryRole')
const {assessmentStatus} = require('../../common/assessment')

const createMail = async (countryIso, assessment, user, loggedInUser, i18n, serverUrl) => {
  const country = await getCountry(countryIso)
  const emailLocalizationParameters = {
    country: i18n.t(`area.${country.countryIso}.listName`),
    serverUrl,
    recipientName: user.name,
    status: i18n.t('assessment.status.' + assessment.status + '.label'),
    changer: loggedInUser.name,
    assessment: i18n.t('assessment.' + assessment.type),
    message: assessment.message
  }
  return {
    to: user.email,
    subject: i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters),
    text: i18n.t(
      'assessment.statusChangeNotification.textMessage',
      emailLocalizationParameters
    ),
    html: i18n.t(
      'assessment.statusChangeNotification.htmlMessage',
      emailLocalizationParameters
    )
  }
}

const getCountryUsers = async (countryIso, roles) => {
  const countryUsers = await fetchCountryUsers(countryIso)
  return R.filter(user => R.contains(user.role, roles), countryUsers)
}

const getRecipients = async (countryIso, newStatus) => {
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

const sendAssessmentNotification = async (countryIso, assessment, loggedInUser, serverUrl) => {
  const i18n = await createI18nPromise('en')
  const recipients = await getRecipients(countryIso, assessment.status)

  // Can't use forEach or map here, await doesn't work properly
  for (const user of recipients) {
    await sendMail(await createMail(countryIso, assessment, user, loggedInUser, i18n, serverUrl))
  }
}

module.exports.sendAssessmentNotification = sendAssessmentNotification
