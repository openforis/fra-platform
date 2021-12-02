import * as path from 'path'
import { config } from 'dotenv'

import { Assessment } from '../../core/meta/assessment/assessment'
import { SectionSpec } from '../../webapp/sectionSpec'
import { Cycle } from '../../core/meta/assessment/cycle'
import { DB } from '../../server/db'
import { getCreateSchemaDDL } from '../../server/repository/assessment/getCreateSchemaDDL'

import { FraSpecs } from './fraSpecs'
import { migrateUsers } from './migrateUsers'
import { migrateMetadata } from './migrateMetadata'
import { migrateAreas } from './migrateAreas'
import { migrateUsersAuthProvider } from './migrateUsersAuthProvider'
import { migrateUsersRole } from './migrateUsersRole'
import { migrateUsersInvitation } from './migrateUsersInvitation'
import { migrateUsersResetPassword } from './migrateUsersResetPassword'

config({ path: path.resolve(__dirname, '..', '..', '.env') })

export const migrate = async (spec: Record<string, SectionSpec>): Promise<void> => {
  // delete old fra
  await DB.query(`drop schema if exists assessment_fra cascade`)
  await DB.query(
    `delete
     from assessment
     where props ->> 'name' = $1`,
    ['fra']
  )

  // insert assessment
  const assessment = await DB.one<Assessment>(
    `insert into assessment (props)
     values ($1::jsonb)
     returning *;`,
    [JSON.stringify({ name: 'fra' })]
  )

  // create schema
  const schema = `assessment_${assessment.props.name}`
  await DB.query(getCreateSchemaDDL(schema))

  await DB.tx(async (client) => {
    const cycle: Cycle = await client.one<Cycle>(
      `insert into assessment_cycle (assessment_id, name)
       values ($1, $2)
       returning *`,
      [assessment.id, '2020']
    )
    await migrateMetadata({ assessment, cycle, schema, spec, client })
    await migrateAreas({ client, schema })
    await migrateUsers({ client })
    await migrateUsersAuthProvider({ client })
    await migrateUsersRole({ assessment, cycle, client })
    await migrateUsersInvitation({ client })
    await migrateUsersResetPassword({ client })

    await client.query(
      `delete
       from settings;
      insert into settings (default_assessment_id)
      values ($1)`,
      [assessment.id]
    )
  })
}

migrate(FraSpecs)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
