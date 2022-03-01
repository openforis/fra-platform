import { ITask } from 'pg-promise'

import * as pgPromise from 'pg-promise'
import { Assessment } from '../../../meta/assessment'
import { DBNames } from '../_DBNames'

export const migrateOdps = async (props: { assessment: Assessment }, client: ITask<any>): Promise<void> => {
  const { assessment } = props
  const pgp = pgPromise()

  const queries = assessment.cycles.map((cycle) => {
    const cycleName = DBNames.getCycleSchema(assessment.props.name, cycle.name)
    return `
insert into ${cycleName}.original_data_point (id,
    country_iso,
    year,
    data_source_additional_comments,
    data_source_methods,
    data_source_references,
    description,
    national_classes,
    id_legacy
)
select id,
       country_iso,
       year,
       data_source_additional_comments,
       data_source_methods,
       data_source_references,
       description,
       national_classes,
       id_legacy
from _legacy.original_data_point;
select setval('${cycleName}.original_data_point_id_seq', (select max(id) from _legacy.original_data_point), true);
`
  })
  await client.query(pgp.helpers.concat(queries))
}
