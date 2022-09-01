import { ITask } from 'pg-promise'
import * as pgPromise from 'pg-promise'

import { Assessment } from '../../../src/meta/assessment/assessment'
import { DBNames } from '../_DBNames'

export const migrateAggregates = async (props: { assessment: Assessment }, client: ITask<any>): Promise<void> => {
  const { assessment } = props
  const pgp = pgPromise()

  const queries = assessment.cycles.map((cycle) => {
    const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)
    return `

      insert into ${schemaCycle}.value_aggregate
      select country_iso,
             case
               when row_name = 'forest_area' then 'forestArea'
               when row_name = 'land_area' then 'totalLandArea'
               when row_name = 'natural_forest_area' then 'naturalForestArea'
               when row_name = 'planted_forest' then 'plantedForest'
               else row_name end
                                                                  as variable_name,
             unnest(array ['1990', '2000', '2010','2015','2020']) as col_name,
             unnest(array [
                      jsonb_build_object('raw', "1990"::text),
                    jsonb_build_object('raw', "2000"::text),
                    jsonb_build_object('raw', "2010"::text),
                    jsonb_build_object('raw', "2015"::text),
                    jsonb_build_object('raw', "2020"::text)
                      ])                                               as value
      from _legacy.country_aggregate
      order by 1, 2, 3;
    `
  })
  await client.query(pgp.helpers.concat(queries))
}
