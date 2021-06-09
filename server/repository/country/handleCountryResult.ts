// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'
import * as R from 'ramda'
import { getCountryProperties } from '@server/repository/country/getCountryProperties'

// @ts-ignore
export const getStatuses = (groupedRows: any) =>
  // @ts-ignore

  R.pipe(R.map(R.pick(['type', 'status'])), R.filter(R.identity))(groupedRows)

/*
 * Determine the "overall status" from multiple statuses.
 * For example, one review is enough to determine that overall
 * the whole country is in review.
 * If all statuses are in accepted, we determine that country is in
 * accepted status.
 */
export const determineCountryAssessmentStatus = (type: any, statuses: any) =>
  R.pipe(
    // @ts-ignore
    R.filter(R.propEq('type', type)),
    R.head,
    R.defaultTo({ status: 'editing' }), // Initially, there are no rows for country's assessment,
    // this is also considered to be 'editing' status
    R.prop('status')
    // @ts-ignore
  )(statuses)

export const handleCountryResult = (resolveRole: any) => (result: any) => {
  const grouped = R.groupBy((row: any) => row.countryIso, camelize(result.rows))
  return R.pipe(
    R.toPairs,
    R.map(([countryIso, vals]) => {
      return {
        // @ts-ignore
        ...getCountryProperties(vals[0]),
        annualAssessment: determineCountryAssessmentStatus('annuallyUpdated', getStatuses(vals)),
        fra2020Assessment: determineCountryAssessmentStatus('fra2020', getStatuses(vals)),
        fra2020DeskStudy: R.pipe(
          R.find(R.propEq('type', 'fra2020')),
          R.propOr(false, 'deskStudy'),
          R.equals(true)
          // @ts-ignore
        )(vals),
        role: resolveRole(countryIso),
      }
    }),
    R.groupBy(R.prop('role'))
  )(grouped)
}
