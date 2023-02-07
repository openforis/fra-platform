import * as pgPromise from 'pg-promise'

import { Assessment } from '../../../src/meta/assessment/assessment'
import { BaseProtocol } from '../../../src/server/db'
import { getCreateSchemaCycleOriginalDataPointViewDDL } from '../../../src/server/repository/assessment/assessment/getCreateSchemaDDL'
import { DBNames } from '../_DBNames'

export const migrateOdps = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const pgp = pgPromise()

  const queries = assessment.cycles.map((cycle) => {
    const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)
    return `
      insert into ${schemaCycle}.original_data_point (id,
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
      from _legacy.original_data_point
      where year is not null;
      select setval('${schemaCycle}.original_data_point_id_seq', (select max(id) from _legacy.original_data_point), true);

      ${getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle)}
    `
  })
  await client.query(pgp.helpers.concat(queries))
}
