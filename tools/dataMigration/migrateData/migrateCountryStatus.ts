import { ITask } from 'pg-promise'

import * as pgPromise from 'pg-promise'
import { Assessment } from '../../../meta/assessment'

export const migrateCountryStatus = async (
  /* props: { assessment: Assessment } */ _: { assessment: Assessment },
  client: ITask<any>
): Promise<void> => {
  const pgp = pgPromise()

  const queries = [
    `
      insert into assessment_fra_2020.country_status (country_iso, status, desk_study)
      select country_iso, status, desk_study from _legacy.assessment;
    `,
    `
    insert into assessment_fra_2025.country_status (country_iso, status, desk_study)
    select country_iso, 'editing', false from _legacy.assessment;
    `,
  ]

  await client.query(pgp.helpers.concat(queries))
}
