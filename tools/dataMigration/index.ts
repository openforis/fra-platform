import * as path from 'path'
import { config } from 'dotenv'

// import { Objects } from '../../core/utils/objects'
import { Assessment, Cycle } from '../../meta/assessment'
import { SectionSpec } from '../../webapp/sectionSpec'
import { BaseProtocol, DB } from '../../server/db'
import { getCreateSchemaCycleDDL, getCreateSchemaDDL } from '../../server/repository/assessment/getCreateSchemaDDL'

import { FraSpecs } from './fraSpecs'
import { migrateUsers } from './migrateUsers'
import { migrateMetadata } from './migrateMetadata'
import { migrateAreas } from './migrateAreas'
import { migrateUsersAuthProvider } from './migrateUsersAuthProvider'
import { migrateUsersRole } from './migrateUsersRole'
import { migrateUsersInvitation } from './migrateUsersInvitation'
import { migrateUsersResetPassword } from './migrateUsersResetPassword'
// import { migrateData } from './migrateData'

config({ path: path.resolve(__dirname, '..', '..', '.env') })

const createCycle = async (assessment: Assessment, cycleName: string, client: BaseProtocol): Promise<Cycle> => {
  await DB.query(
    getCreateSchemaCycleDDL(`assessment_${assessment.props.name}`, `assessment_${assessment.props.name}_${cycleName}`)
  )
  return client.one<Cycle>(
    `insert into assessment_cycle (assessment_id, name)
     values ($1, $2)
     returning *`,
    [assessment.id, cycleName]
  )
}

export const migrate = async (spec: Record<string, SectionSpec>): Promise<void> => {
  // delete old fra
  await DB.query(`drop schema if exists assessment_fra cascade;`)
  await DB.query(`drop schema if exists assessment_fra_2020 cascade;`)
  await DB.query(`drop schema if exists assessment_fra_2025 cascade;`)
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
    const cycle2020 = await createCycle(assessment, '2020', client)
    const cycle2025 = await createCycle(assessment, '2025', client)
    assessment.cycles = [cycle2020, cycle2025]
    // const schemaCycle2020 = `${schema}_${cycle2020.name}`

    await migrateMetadata({ assessment, schema, spec, client })
    await migrateAreas({ client, schema })
    await migrateUsers({ client })
    await migrateUsersAuthProvider({ client })
    await migrateUsersRole({ assessment, client })
    await migrateUsersInvitation({ client })
    await migrateUsersResetPassword({ client })

    await client.query(
      `delete
       from settings;
      insert into settings (default_assessment_id)
      values ($1)`,
      [assessment.id]
    )

    // TODO: data migration
    // const tables = await client.map<Table>(
    //   `select *
    //    from ${schema}.table
    //    order by id`,
    //   [],
    //   // @ts-ignore
    //   Objects.camelize
    // )
    //
    // await Promise.all(
    //   tables.map(async (table) => {
    //     if (!['extentOfForest', 'forestCharacteristics', 'growingStock'].includes(table.props.name)) {
    //       // TODO: sustainable development tables have no name, only calculated rows
    //       if (table.props.name !== '') {
    //         if (table.props.name === 'specificForestCategories') {
    //           await migrateData({ client, schema, table, schemaCycle: schemaCycle2020 })
    //         }
    //       }
    //     }
    //     return Promise.resolve()
    //   })
    // )
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
