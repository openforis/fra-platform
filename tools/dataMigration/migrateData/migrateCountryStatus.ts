import { ITask } from 'pg-promise'

import * as pgPromise from 'pg-promise'
import { Assessment } from '../../../meta/assessment/assessment'
import { DBNames } from '../_DBNames'

export const migrateCountryStatus = async (props: { assessment: Assessment }, client: ITask<any>): Promise<void> => {
  const pgp = pgPromise()

  const { assessment } = props

  const queries = assessment.cycles.map((cycle, i) => {
    const cycleName = DBNames.getCycleSchema(assessment.props.name, cycle.name)

    if (i === 0) {
      return `insert into ${cycleName}.country_status (country_iso, status, desk_study)
      select country_iso, status, desk_study from _legacy.assessment;`
    }

    return `insert into ${cycleName}.country_status (country_iso, status, desk_study)
    select country_iso, 'editing', false from _legacy.assessment;`
  })

  await client.query(pgp.helpers.concat(queries))
}
