const Promise = require('bluebird')
const R = require('ramda')
const db = require('../db/db')

const Request = require('../utils/requestUtils')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')

const countryRepository = require('./countryRepository')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const assessmentRepository = require('../assessment/assessmentRepository')
const { fetchCollaboratorCountryAccessTables } = require('../collaborators/collaboratorsRepository')
const Auth = require('../auth/authApiMiddleware')

const {
  isUserRoleAllowedToEditAssessmentData,
  isUserRoleAllowedToEditAssessmentComments,
} = require('../../common/assessmentRoleAllowance')
const { roleForCountry, isCollaborator } = require('../../common/countryRole')

const CountryService = require('./countryService')
const VersionService = require('../versioning/service')

module.exports.init = (app) => {
  app.get('/country/all', async (req, res) => {
    try {
      const schmeName = await VersionService.getDatabaseSchema(req)
      const userRoles = Request.getUserRoles(req)
      const result = await countryRepository.getAllowedCountries(userRoles, schmeName)

      res.json(result)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  app.get('/countries/:region?', async (req, res) => {
    try {
      const { region } = req.params
      // This endpoint does not return Atlantis countries (first countryIso character = X)
      const countries = region
        ? await CountryService.getRegionCountriesList(region)
        : (await CountryService.getAllCountriesList()).filter((country) => country.countryIso[0] !== 'X')
      res.json(countries)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // Returns all regions from country_region table
  app.get('/country/regions', async (req, res) => {
    try {
      const countryRegions = await CountryService.getCountryRegions()
      res.json(countryRegions)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  app.get('/country/overviewStatus/:countryIso', async (req, res) => {
    try {
      //TODO - REFACTOR

      const { countryIso } = req.params
      const userInfo = req.user

      const assessmentsPromise = assessmentRepository.getAssessments(countryIso)
      if (userInfo) {
        checkCountryAccessFromReqParams(req)

        const odpDataPromise = odpRepository.listAndValidateOriginalDataPoints(countryIso)
        const reviewStatusPromise = reviewRepository.getCountryIssuesSummary(countryIso, userInfo)

        const [odps, reviewStatus, assessmentsDB] = await Promise.all([
          odpDataPromise,
          reviewStatusPromise,
          assessmentsPromise,
        ])

        const userRole = roleForCountry(countryIso, userInfo)
        const assessments = R.reduce(
          (assessmentsObj, assessmentKey) => {
            const assessment = R.pipe(R.prop(assessmentKey), (a) => ({
              ...a,
              canEditData: isUserRoleAllowedToEditAssessmentData(userRole, a.status),
              canEditComments: isUserRoleAllowedToEditAssessmentComments(userRole, a.status),
            }))(assessmentsDB)
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
          errors: R.filter((o) => !o.validationStatus.valid, odps).length !== 0,
        }

        res.json({
          odpStatus,
          reviewStatus,
          assessments,
        })
      } else {
        const assessmentsDB = await assessmentsPromise

        const assessments = R.reduce(
          (assessmentsObj, assessmentKey) => {
            const assessment = R.pipe(R.prop(assessmentKey), (a) => ({
              ...a,
              canEditData: false,
              canEditComments: false,
            }))(assessmentsDB)
            return R.assoc(assessmentKey, assessment, assessmentsObj)
          },
          {},
          R.keys(assessmentsDB)
        )
        res.json({ assessments })
      }
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // Changes one key/value pair
  app.post('/country/config/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      await db.transaction(countryRepository.saveDynamicConfigurationVariable, [
        req.params.countryIso,
        req.body.key,
        req.body.value,
      ])
      res.json({})
    } catch (e) {
      Request.sendErr(res, e)
    }
  })

  app.get('/country/config/:countryIso', async (req, res) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const fullConfig = await CountryService.getCountryConfigFull(req.params.countryIso, schemaName)
      res.json(fullConfig)
    } catch (e) {
      Request.sendErr(res, e)
    }
  })
}
