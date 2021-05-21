import * as R from 'ramda'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'
import * as Request from '../utils/requestUtils'
import * as countryRepository from './countryRepository'
import * as reviewRepository from '../review/reviewRepository'
import * as odpRepository from '../odp/odpRepository'
import * as assessmentRepository from '../assessment/assessmentRepository'
import { fetchCollaboratorCountryAccessTables } from '../collaborators/collaboratorsRepository'
import {
  isUserRoleAllowedToEditAssessmentData,
  isUserRoleAllowedToEditAssessmentComments,
} from '../../common/assessmentRoleAllowance'
import { roleForCountry, isCollaborator } from '../../common/countryRole'
import * as CountryService from './countryService'
import * as VersionService from '../versioning/service'

export const init = (app: any) => {
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
  app.post(
    '/country/config/:countryIso',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
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
    }
  )
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
