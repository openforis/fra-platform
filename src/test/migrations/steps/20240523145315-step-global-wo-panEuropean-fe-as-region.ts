import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  // 1. FRA uses 'Global' | WO as global region
  // 2. (No migration) PanEuropean uses 'PanEuropean' | FE as region, and it is working as expected before migration

  // Insert public region
  await client.query(`insert into public.region (region_code, name) values ('WO', 'Global');`)

  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const cycleSchema = Schemas.getNameCycle(assessment, cycle)
    // 1. Increment all region_group orders by 1
    await client.query(`update ${cycleSchema}.region_group set "order" = "order" + 1`)

    // 2. Add a new region_group with order 0 (global)
    await client.query(`insert into ${cycleSchema}.region_group (name, "order") values ('global', 0)`)

    // 3. Create new cycle level region with code 'WO' with region_group_id from select
    await client.query(`
        insert into ${cycleSchema}.region (region_code, region_group_id)
        select 'WO', id from ${cycleSchema}.region_group where name = 'global'
      `)
  })
}
