const Promise = require('bluebird')
const R = require('ramda')
const db = require('../db/db')

const { sendErr } = require('../utils/requestUtils')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')

const countryRepository = require('./countryRepository')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const auditRepository = require('../audit/auditRepository')
const assessmentRepository = require('../assessment/assessmentRepository')
const { fetchCollaboratorCountryAccessTables } = require('./../collaborators/collaboratorsRepository')

const {
  isUserRoleAllowedToEditAssessmentData,
  isUserRoleAllowedToEditAssessmentComments
} = require('../../common/assessmentRoleAllowance')
const { roleForCountry, isCollaborator } = require('../../common/countryRole')

const CountryService = require('./countryService')

module.exports.init = app => {

  app.get('/country/all', (req, res) => {
    countryRepository.getAllowedCountries(req.user.roles).then(result => {
      res.json(result)
    }).catch(err => sendErr(res, err))
  })

  app.get('/country/overviewStatus/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const { countryIso } = req.params
      const userInfo = req.user

      const odpDataPromise = odpRepository.listAndValidateOriginalDataPoints(countryIso)
      const reviewStatusPromise = reviewRepository.getCountryIssuesSummary(countryIso, userInfo)
      const assessmentsPromise = assessmentRepository.getAssessments(countryIso)

      const [odps, reviewStatus, assessmentsDB] = await Promise.all([odpDataPromise, reviewStatusPromise, assessmentsPromise])

      const userRole = roleForCountry(countryIso, userInfo)
      const assessments = R.reduce(
        (assessmentsObj, assessmentKey) => {
          const assessment = R.pipe(
            R.prop(assessmentKey),
            a => ({
              ...a,
              canEditData: isUserRoleAllowedToEditAssessmentData(userRole, a.status),
              canEditComments: isUserRoleAllowedToEditAssessmentComments(userRole, a.status)
            })
          )(assessmentsDB)
          return R.assoc(assessmentKey, assessment, assessmentsObj)
        },
        {},
        R.keys(assessmentsDB)
      )
      if (isCollaborator(countryIso, userInfo)) {
        const tables = await fetchCollaboratorCountryAccessTables(countryIso, userInfo.id)
        assessments.fra2020.tablesAccess = tables
      }

      const odpStatus = {
        count: odps.length,
        errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
      }

      res.json({
        odpStatus,
        reviewStatus,
        assessments
      })

    } catch (err) {
      sendErr(res, err)
    }
  })

  // Changes one key/value pair
  app.post('/country/config/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      await db.transaction(countryRepository.saveDynamicConfigurationVariable,
        [
          req.params.countryIso,
          req.body.key,
          req.body.value
        ]
      )
      res.json({})
    } catch (e) {
      sendErr(res, e)
    }
  })

  app.get('/country/config/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const fullConfig = await CountryService.getCountryConfigFull(req.params.countryIso)

      res.json(fullConfig)
    } catch (e) {
      sendErr(res, e)
    }
  })
}
