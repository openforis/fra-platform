import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import migration from './20240320133134-step-fix-migrate-data-sources-link'

/**
 * This migration affects only the Pan-European assessment cycle 2025.
 * We know that we only have data for 2025 in regard of files for Pan-European assessment.
 * @param client  The database client
 */

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2025' },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // 1. Migrate all existing files to new file table
  await client.query(`
      insert into public.file (uuid, name, file)
      select f.uuid, f.file_name, f.file
      from ${schemaAssessment}.file f
      order by f.id;
  `)

  // 2. Migrate metadata
  await client.query(`
      insert into ${schemaCycle}.repository (country_iso, file_uuid, props)
      select country_iso, uuid, props || jsonb_build_object('translation', jsonb_build_object('en', file_name))
      from ${schemaAssessment}.file
      order by id;
  `)

  //  3. Fix all data sources with old file api link
  await migration(client, assessment)
}
