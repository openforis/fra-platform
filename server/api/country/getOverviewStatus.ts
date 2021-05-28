import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import * as odpRepository from '@server/odp/odpRepository'
import * as reviewRepository from '@server/repository/review/reviewRepository'
import { isCollaborator, roleForCountry } from '@common/countryRole'
import * as R from 'ramda'
import {
  isUserRoleAllowedToEditAssessmentComments,
  isUserRoleAllowedToEditAssessmentData,
} from '@common/assessmentRoleAllowance'
import * as assessmentRepository from '@server/assessment/assessmentRepository'
import { fetchCollaboratorCountryAccessTables } from '@server/repository/collaborators/collaboratorsRepository'

// TODO - REFACTOR

export const CountryGetOverviewStatus = {
  init: (express: Express): void => {
    // Returns all regions from country_region table
    express.get('/api/country/overviewStatus/:countryIso', async (req: Request, res: Response) => {
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
        Requests.sendErr(res, err)
      }
    })
  },
}
