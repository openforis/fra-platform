import * as path from 'path'
import { config } from 'dotenv'

import { Assessment } from '../../core/meta/assessment'
import { SectionSpec } from '../../webapp/sectionSpec'

import { FraSpecs } from './fraSpecs'
import { DB } from '../../server/db'
import { getCreateSchemaDDL } from '../../server/repository/assessment/getCreateSchemaDDL'
import { migrateUsers } from './migrateUsers'
import { migrateMetadata } from './migrateMetadata'
import { migrateAreas } from './migrateAreas'

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
    await migrateMetadata({ assessment, schema, spec, client })
    await migrateAreas({ client, schema })
    await migrateUsers({ client })
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
