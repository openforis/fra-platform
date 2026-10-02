import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Promises } from 'utils/promises'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const assessmentName = AssessmentNames.fra
const schemaName = Schemas.getSchemaAssessment({ assessmentName })
const tableName = 'reportLastUpdate'
const variableName = 'reportLastUpdate'
const visibilityTableNames = [tableName, 'contactPersons']

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)

  const cycleSource = assessment.cycles.find((cycle) => cycle.name === CycleNames.latest)
  const cycleTarget = assessment.cycles.find((cycle) => cycle.name === CycleNames.latest2)
  if (!cycleSource || !cycleTarget) return

  const params = {
    cycleSourceUuid: cycleSource.uuid,
    cycleTargetUuid: cycleTarget.uuid,
    tableName,
    visibilityTableNames,
    variableName,
  }

  // Cloning latest into latest2 didn't copy these tables' visibility, so copy it now
  await client.query(
    `
      update ${schemaName}."table" t
      set props = jsonb_set(
        t.props,
        array['visibility', $(cycleTargetUuid)],
        t.props -> 'visibility' -> $(cycleSourceUuid)
      )
      where t.props ->> 'name' in ($(visibilityTableNames:csv))
        and t.props -> 'cycles' ? $(cycleTargetUuid)
        and t.props -> 'visibility' ? $(cycleSourceUuid)
        and not (t.props -> 'visibility' ? $(cycleTargetUuid))
    `,
    params
  )

  // The clone didn't copy the client side calculation flag either, so the year showed up empty
  await client.query(
    `
      update ${schemaName}.col c
      set props = jsonb_set(
        c.props,
        array['calculateClientSide', $(cycleTargetUuid)],
        c.props -> 'calculateClientSide' -> $(cycleSourceUuid)
      )
      from ${schemaName}."row" r
      join ${schemaName}."table" t on t.uuid = r.table_uuid
      where c.row_uuid = r.uuid
        and t.props ->> 'name' = $(tableName)
        and r.props ->> 'variableName' = $(variableName)
        and c.props ->> 'colType' = 'calculated'
        and c.props -> 'cycles' ? $(cycleTargetUuid)
        and c.props -> 'calculateClientSide' ? $(cycleSourceUuid)
        and not (c.props -> 'calculateClientSide' ? $(cycleTargetUuid))
    `,
    params
  )

  // The publication year is calculated, so it shouldn't have validators
  await Promises.each([cycleSource, cycleTarget], async (cycle) => {
    await client.query(
      `
        update ${schemaName}."row" r
        set props = jsonb_set(
          r.props,
          array['validateFns', $(cycleUuid)],
          '[]'::jsonb
        )
        from ${schemaName}."table" t
        where r.table_uuid = t.uuid
          and t.props ->> 'name' = $(tableName)
          and r.props ->> 'variableName' = $(variableName)
          and r.props -> 'cycles' ? $(cycleUuid)
      `,
      { cycleUuid: cycle.uuid, tableName, variableName }
    )
  })

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}
