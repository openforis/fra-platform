const R = require('ramda')
const {createI18nPromise} = require('../../common/i18n/i18nFactory')
const {sendMail} = require('../email/sendMail')
const {getCountry} = require('../country/countryRepository')
const {fetchCountryUsers} = require('../user/userRepository')

const createMail = async (countryIso, assessment, user, loggedInUser, i18n, serverUrl) => {
  const country = await getCountry(countryIso)
  const emailLocalizationParameters = {
    country: country.listName.en,
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

const relevantUser = (newStatus, role) => {
  if (newStatus === 'accepted' && role === 'NATIONAL_CORRESPONDENT') {
    return true
  } else if (newStatus === 'review' && role === 'REVIEWER') {
    return true
  } else if (newStatus === 'editing' && role === 'NATIONAL_CORRESPONDENT') {
    return true
  }
  return false
}

const sendAssessmentNotification = async (countryIso, assessment, loggedInUser, serverUrl) => {
  const i18n = await createI18nPromise('en')
  const countryUsers = await fetchCountryUsers(countryIso)
  const relevantUsers = R.filter(user => relevantUser(assessment.status, user.role), countryUsers)

  // Can't use forEach or map here, await doesn't work properly
  for (const user of relevantUsers) {
    await sendMail(await createMail(countryIso, assessment, user, loggedInUser, i18n, serverUrl))
  }
}

module.exports.sendAssessmentNotification = sendAssessmentNotification
