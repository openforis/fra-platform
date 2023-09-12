import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
    UPDATE assessment_fra_2020.original_data_point
    SET data_source_methods=subquery.data_source_methods::jsonb
    FROM (
      SELECT original_data_point.id_legacy, odpv.data_source_methods->>'methods' as data_source_methods
      FROM _legacy.odp as odp
      LEFT JOIN _legacy.odp_version as odpv ON odp.actual_id = odpv.id
      JOIN _legacy.original_data_point as original_data_point ON odp.id = original_data_point.id_legacy
    ) AS subquery
    WHERE assessment_fra_2020.original_data_point.id_legacy=subquery.id_legacy
    AND subquery.data_source_methods is not NULL;`)

  await client.query(`
      UPDATE assessment_fra_2020.original_data_point
      SET data_source_methods=subquery.data_source_methods::jsonb
      FROM (
        SELECT original_data_point.id_legacy, odpv.data_source_methods->>'methods' as data_source_methods
        FROM _legacy.odp as odp
        LEFT JOIN _legacy.odp_version as odpv ON odp.draft_id = odpv.id
        JOIN _legacy.original_data_point as original_data_point ON odp.id = original_data_point.id_legacy
      ) AS subquery
      WHERE assessment_fra_2020.original_data_point.id_legacy=subquery.id_legacy
      AND subquery.data_source_methods is not NULL;`)

  await client.query(`
    UPDATE assessment_fra_2025.original_data_point
    SET data_source_methods=subquery.data_source_methods::jsonb
    FROM (
      SELECT original_data_point.id_legacy, odpv.data_source_methods->>'methods' as data_source_methods
      FROM _legacy.odp as odp
      LEFT JOIN _legacy.odp_version as odpv ON odp.actual_id = odpv.id
      JOIN _legacy.original_data_point as original_data_point ON odp.id = original_data_point.id_legacy
    ) AS subquery
    WHERE assessment_fra_2025.original_data_point.id_legacy=subquery.id_legacy
    AND subquery.data_source_methods is not NULL;`)

  await client.query(`
    UPDATE assessment_fra_2025.original_data_point
    SET data_source_methods=subquery.data_source_methods::jsonb
    FROM (
      SELECT original_data_point.id_legacy, odpv.data_source_methods->>'methods' as data_source_methods
      FROM _legacy.odp as odp
      LEFT JOIN _legacy.odp_version as odpv ON odp.draft_id = odpv.id
      JOIN _legacy.original_data_point as original_data_point ON odp.id = original_data_point.id_legacy
    ) AS subquery
    WHERE assessment_fra_2025.original_data_point.id_legacy=subquery.id_legacy
    AND subquery.data_source_methods is not NULL;`)
}
