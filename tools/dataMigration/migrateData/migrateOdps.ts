import { ITask } from 'pg-promise'

import * as pgPromise from 'pg-promise'
import { Assessment } from '../../../meta/assessment'
import { DBNames } from '../_DBNames'

export const migrateOdps = async (props: { assessment: Assessment }, client: ITask<any>): Promise<void> => {
  const { assessment } = props
  // const schema = DBNames.getAssessmentSchema(assessment.props.name)
  // create data views
  const pgp = pgPromise()

  const queries = assessment.cycles.map((cycle) => {
    const cycleName = DBNames.getCycleSchema(assessment.props.name, cycle.name)
    return `
    with c as (select jsonb_build_object('cycles', jsonb_agg(uuid)) as props from public.assessment_cycle)

insert into ${cycleName}.original_data_point (id,
    country_iso,
    year,
    data_source_additional_comments,
    data_source_methods,
    data_source_references,
    description,
    national_classes,
    id_legacy,
    props
)
select id,
       country_iso,
       year,
       data_source_additional_comments,
       data_source_methods,
       data_source_references,
       description,
       national_classes,
       id_legacy,
       (select * from c) from _legacy.original_data_point;
`
  })
  await client.query(pgp.helpers.concat(queries))
}
