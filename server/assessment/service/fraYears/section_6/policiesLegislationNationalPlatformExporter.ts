// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PoliciesLe... Remove this comment to see the full error message
class PoliciesLegislationNationalPlatformExporter extends TraditionalTableExporter {
  constructor() {
    super(
      'forestPolicy',
      [
        'policies_national',
        'policies_sub_national',
        'legislation_national',
        'legislation_sub_national',
        'platform_national',
        'platform_sub_national',
        'traceability_national',
        'traceability_sub_national',
      ],
      '6a'
    )
  }

  parseResultRow(result: any, yearIdx: any) {
    const resultRow = {}

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'policies_national' does not exist on typ... Remove this comment to see the full error message
    resultRow.policies_national = R.path([0, 0], result)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'policies_sub_national' does not exist on... Remove this comment to see the full error message
    resultRow.policies_sub_national = R.path([0, 1], result)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'legislation_national' does not exist on ... Remove this comment to see the full error message
    resultRow.legislation_national = R.path([1, 0], result)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'legislation_sub_national' does not exist... Remove this comment to see the full error message
    resultRow.legislation_sub_national = R.path([1, 1], result)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'platform_national' does not exist on typ... Remove this comment to see the full error message
    resultRow.platform_national = R.path([2, 0], result)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'platform_sub_national' does not exist on... Remove this comment to see the full error message
    resultRow.platform_sub_national = R.path([2, 1], result)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'traceability_national' does not exist on... Remove this comment to see the full error message
    resultRow.traceability_national = R.path([3, 0], result)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'traceability_sub_national' does not exis... Remove this comment to see the full error message
    resultRow.traceability_sub_national = R.path([3, 1], result)

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new PoliciesLegislationNationalPlatformExporter()

module.exports = instance
