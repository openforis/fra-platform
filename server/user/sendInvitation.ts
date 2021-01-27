// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const { getCountry } = require('../country/countryRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createI18n... Remove this comment to see the full error message
const { createI18nPromise } = require('../../common/i18n/i18nFactory')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendMail'.
const { sendMail } = require('../email/sendMail')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getRoleLab... Remove this comment to see the full error message
const { getRoleLabelKey } = require('../../common/countryRole')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'loginUrl'.
const loginUrl = (user: any, url: any) => `${url}/login${user.invitationUuid ? `?i=${user.invitationUuid}` : ''}`

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createMail... Remove this comment to see the full error message
const createMail = async (countryIso: any, invitedUser: any, loggedInUser: any, url: any, i18n: any) => {
  const link = loginUrl(invitedUser, url)
  const dbCountry = await getCountry(countryIso)
  const country = dbCountry.listName.en
  const role = getRoleLabelKey(invitedUser.role)
  return {
    to: invitedUser.email,
    subject: i18n.t('userManagement.invitationEmail.subject', { country }),
    text: i18n.t('userManagement.invitationEmail.textMessage', {
      country,
      invitedUser: invitedUser.name,
      role: `$t(${role})`,
      loggedInUser: loggedInUser.name,
      link,
      url,
    }),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', {
      country,
      invitedUser: invitedUser.name,
      role: `$t(${role})`,
      loggedInUser: loggedInUser.name,
      link,
      url,
    }),
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendInvita... Remove this comment to see the full error message
const sendInvitation = async (countryIso: any, invitedUser: any, loggedInUser: any, url: any) => {
  const i18n = await createI18nPromise('en')
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 6 arguments, but got 5.
  const invitationEmail = await createMail(countryIso, invitedUser, loggedInUser, url, i18n)
  await sendMail(invitationEmail)
}

module.exports.sendInvitation = sendInvitation
module.exports.loginUrl = loginUrl
