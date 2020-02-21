const _axios = require('axios')

const __DEBUG__ = process.argv.slice(2).map(x => x.toLowerCase()).includes('debug');

const axios = _axios.create({
  baseURL: 'http://localhost:9001/',
});

const handleSuccess = (response) => {
  const str = `${response.status}\t${response.path}`
  console.log(str)
  if (__DEBUG__) {
    console.log({ ...response })
  }
}

const handleError = (error, ...rest) => {
  if (__DEBUG__) {
    console.error(`Error:\n${JSON.stringify(error, null, 2)}`)
    if (rest) {
      console.error(rest)
    }
  }
  console.error(error.message)
}

// Example
const countryIso = 'AFG'

axios('/api/country/all').then(handleSuccess).catch(handleError)
// axios(`/api/country/descriptions/${countryIso}/${section}/${name}`).then(handleSuccess).catch(handleError)
// axios(`/api/country/overviewStatus/${countryIso}`).then(handleSuccess).catch(handleError)
// axios(`/api/country/config/${countryIso}`).then(handleSuccess).catch(handleError)
// axios(`/auth/invitation/${invitationUUID}`).then(handleSuccess).catch(handleError)
// axios(`/auth/local/resetPassword/${uuid}`).then(handleSuccess).catch(handleError)
// axios(`/api/traditionalTable/${countryIso}/${tableSpec.name}`).then(handleSuccess).catch(handleError)
// axios(`/api/odp/?${R.isNil(odpId)`)`.then(handleSuccess).catch(handleError)
// axios(`/api/odps/${countryIso}`).then(handleSuccess).catch(handleError)
// axios(`/api/prevOdp/${countryIso}/${odp.year}?countryIso=${countryIso}`).then(handleSuccess).catch(handleError)
// axios(`/api/userChat/${countryIso}/messages/new`).then(handleSuccess).catch(handleError)
// axios(`/api/countryMessageBoard/${countryIso}/messages/new`).then(handleSuccess).catch(handleError)
// axios(`/api/versioning/`).then(handleSuccess).catch(handleError)
// axios(`/api/review/${countryIso}/${section}?target=${target}`).then(handleSuccess).catch(handleError)
// axios(`/api/review/${countryIso}/${section}?target=${target}`).then(handleSuccess).catch(handleError)
// axios(`/api/review/${countryIso}/${section}/summary?target=${target}`).then(handleSuccess).catch(handleError)

// All get from application (grep app.get)
// axios('/userChat/:countryIso/messages/all').then(handleSuccess).catch(handleError)
// axios('/userChat/:countryIso/messages/new').then(handleSuccess).catch(handleError)
// axios('/landing/:countryIso/overview').then(handleSuccess).catch(handleError)
// axios('/landing/sdgFocalPoints').then(handleSuccess).catch(handleError)
// axios('/fileRepository/userGuide/:lang').then(handleSuccess).catch(handleError)
// axios('/fileRepository/:countryIso/filesList').then(handleSuccess).catch(handleError)
// axios('/fileRepository/:countryIso/file/:fileId').then(handleSuccess).catch(handleError)
// axios('/countryMessageBoard/:countryIso/messages/all').then(handleSuccess).catch(handleError)
// axios('/countryMessageBoard/:countryIso/messages/new').then(handleSuccess).catch(handleError)
// axios('/growingStock/:countryIso').then(handleSuccess).catch(handleError)
// axios('/country/descriptions/:countryIso/:section/:name').then(handleSuccess).catch(handleError)
// axios('/biomassStock/:countryIso/:domain/:lang/download').then(handleSuccess).catch(handleError)
// axios('/assessment/admin/export').then(handleSuccess).catch(handleError)
// axios('/sustainableDevelopment/:countryIso').then(handleSuccess).catch(handleError)
// axios('/audit/getLatestAuditLogTimestamp/:countryIso').then(handleSuccess).catch(handleError)
// axios('/audit/getAuditFeed/:countryIso').then(handleSuccess).catch(handleError)
// axios('/loggedInUser/').then(handleSuccess).catch(handleError)
// axios('/users/:countryIso').then(handleSuccess).catch(handleError)
// axios('/users').then(handleSuccess).catch(handleError)
// axios('/users/:countryIso/user/edit/:userId').then(handleSuccess).catch(handleError)
// axios('/users/:countryIso/user/:userId/profilePicture').then(handleSuccess).catch(handleError)
// axios('/users/:countryIso/invitations/:invitationUuid/send').then(handleSuccess).catch(handleError)
// axios('/users/invitations/send').then(handleSuccess).catch(handleError)
// axios('/review/:countryIso/:section/summary').then(handleSuccess).catch(handleError)
// axios('/review/:countryIso/:section').then(handleSuccess).catch(handleError)
// axios('/odp').then(handleSuccess).catch(handleError)
// axios('/odps/:countryIso').then(handleSuccess).catch(handleError)
// axios('/prevOdp/:countryIso/:year').then(handleSuccess).catch(handleError)
// axios('/versioning/').then(handleSuccess).catch(handleError)
// axios('/traditionalTable/:countryIso/:tableSpecName').then(handleSuccess).catch(handleError)
// axios('/definitions/:lang/:name').then(handleSuccess).catch(handleError)
// axios('/country/all').then(handleSuccess).catch(handleError)
// axios('/country/overviewStatus/:countryIso').then(handleSuccess).catch(handleError)
// axios('/country/config/:countryIso').then(handleSuccess).catch(handleError)
// axios('/nde/:section/:countryIso').then(handleSuccess).catch(handleError)
// axios('/panEuropean/:countryIso/uploadedQuestionareInfo').then(handleSuccess).catch(handleError)
// axios('/panEuropean/:countryIso/downloadEmpty/:lang').then(handleSuccess).catch(handleError)
// axios('/panEuropean/:countryIso/download').then(handleSuccess).catch(handleError)
// axios('/auth/invitation/:uuid').then(handleSuccess).catch(handleError)
// axios('/auth/google').then(handleSuccess).catch(handleError)
// axios('/auth/google/callback').then(handleSuccess).catch(handleError)
// axios('/auth/local/resetPassword/:uuid').then(handleSuccess).catch(handleError)
