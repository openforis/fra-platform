// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Request'.
const Request = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'countryRep... Remove this comment to see the full error message
const countryRepository = require('./countryRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'reviewRepo... Remove this comment to see the full error message
const reviewRepository = require('../review/reviewRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'odpReposit... Remove this comment to see the full error message
const odpRepository = require('../odp/odpRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const assessmentRepository = require('../assessment/assessmentRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchColla... Remove this comment to see the full error message
const { fetchCollaboratorCountryAccessTables } = require('../collaborators/collaboratorsRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')
const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
  isUserRoleAllowedToEditAssessmentData,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
  isUserRoleAllowedToEditAssessmentComments,
} = require('../../common/assessmentRoleAllowance')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'roleForCou... Remove this comment to see the full error message
const { roleForCountry, isCollaborator } = require('../../common/countryRole')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountrySer... Remove this comment to see the full error message
const CountryService = require('./countryService')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

module.exports.init = (app: any) => {
  app.get('/country/all', async (req: any, res: any) => {
    try {
      const schmeName = await VersionService.getDatabaseSchema(req)
      const userRoles = (Request as any).getUserRoles(req)
      const result = await countryRepository.getAllowedCountries(userRoles, schmeName)
      res.json(result)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  app.get('/countries/', async (req: any, res: any) => {
    try {
      // This endpoint does not return Atlantis countries (first countryIso character = X)
      const countries = (await CountryService.getAllCountriesList()).filter(
        (country: any) => country.countryIso[0] !== 'X'
      )
      res.json(countries)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // Returns all regions from country_region table
  app.get('/country/regions', async (req: any, res: any) => {
    try {
      const regions = await CountryService.getRegions()
      res.json(regions)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // Returns all region groups from region_group table
  app.get('/country/regionGroups', async (req: any, res: any) => {
    try {
      const regionGroups = await CountryService.getRegionGroups()
      res.json(regionGroups)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  app.get('/country/overviewStatus/:countryIso', async (req: any, res: any) => {
    try {
      // TODO - REFACTOR
      const { countryIso } = req.params
      const userInfo = req.user
      const assessmentsPromise = assessmentRepository.getAssessments(countryIso)
      if (userInfo) {
        const odpDataPromise = odpRepository.listAndValidateOriginalDataPoints(countryIso)
        const reviewStatusPromise = reviewRepository.getCountryIssuesSummary(countryIso, userInfo)
        const [odps, reviewStatus, assessmentsDB] = await Promise.all([
          odpDataPromise,
          reviewStatusPromise,
          assessmentsPromise,
        ])
        const userRole = roleForCountry(countryIso, userInfo)
        const assessments = R.reduce(
          (assessmentsObj: any, assessmentKey: any) => {
            const assessment = R.pipe(R.prop(assessmentKey), (a: any) => ({
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
          errors: R.filter((o: any) => !o.validationStatus.valid, odps).length !== 0,
        }
        res.json({
          odpStatus,
          reviewStatus,
          assessments,
        })
      } else {
        const assessmentsDB = await assessmentsPromise
        const assessments = R.reduce(
          (assessmentsObj: any, assessmentKey: any) => {
            const assessment = R.pipe(R.prop(assessmentKey), (a: any) => ({
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
      ;(Request as any).sendErr(res, err)
    }
  })
  // Changes one key/value pair
  app.post('/country/config/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      await db.transaction(countryRepository.saveDynamicConfigurationVariable, [
        req.params.countryIso,
        req.body.key,
        req.body.value,
      ])
      res.json({})
    } catch (e) {
      ;(Request as any).sendErr(res, e)
    }
  })
  app.get('/country/config/:countryIso', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const fullConfig = await CountryService.getCountryConfigFull(req.params.countryIso, schemaName)
      res.json(fullConfig)
    } catch (e) {
      ;(Request as any).sendErr(res, e)
    }
  })
}
