import * as path from 'path'
import { config } from 'dotenv'

import { Assessment as AssessmentLegacy } from '../../core/assessment/assessment'
import { FRA } from '../../core/assessment'

import { Assessment, Cycle } from '../../meta/assessment'
import { SectionSpec } from '../../webapp/sectionSpec'
import { BaseProtocol, DB } from '../../server/db'
import { getCreateSchemaCycleDDL, getCreateSchemaDDL } from '../../server/repository/assessment/getCreateSchemaDDL'

import { DBNames } from './_DBNames'
import { FraSpecs } from './fraSpecs'
import { migrateUsers } from './migrateUsers'
import { migrateMetadata } from './migrateMetadata'
import { migrateAreas } from './migrateAreas'
import { migrateUsersAuthProvider } from './migrateUsersAuthProvider'
import { migrateUsersRole } from './migrateUsersRole'
import { migrateUsersInvitation } from './migrateUsersInvitation'
import { migrateUsersResetPassword } from './migrateUsersResetPassword'
import { migrateTablesData } from './migrateData/migrateTablesData'
import { migrateOdps } from './migrateData/migrateOdps'
import { migrateCountryStatus } from './migrateData/migrateCountryStatus'

config({ path: path.resolve(__dirname, '..', '..', '.env') })

const createCycle = async (assessment: Assessment, cycleName: string, client: BaseProtocol): Promise<Cycle> => {
  await DB.query(
    getCreateSchemaCycleDDL(
      DBNames.getAssessmentSchema(assessment.props.name),
      DBNames.getCycleSchema(assessment.props.name, cycleName)
    )
  )
  return client.one<Cycle>(
    `insert into assessment_cycle (assessment_id, name)
     values ($1, $2)
     returning *`,
    [assessment.id, cycleName]
  )
}

export const migrate = async (props: {
  assessmentName: string
  assessmentLegacy: AssessmentLegacy
  cycleNames: Array<string>
  spec: Record<string, SectionSpec>
}): Promise<void> => {
  const { assessmentName, assessmentLegacy, cycleNames, spec } = props

  // delete old assessment
  await DB.query(`drop schema if exists ${DBNames.getAssessmentSchema(assessmentName)} cascade;`)
  await Promise.all(
    cycleNames.map((cycleName) =>
      DB.query(`drop schema if exists ${DBNames.getCycleSchema(assessmentName, cycleName)} cascade;`)
    )
  )

  await DB.query(
    `delete
     from assessment
     where props ->> 'name' = $1`,
    [assessmentName]
  )

  // insert assessment
  const assessment = await DB.one<Assessment>(
    `insert into assessment (props)
     values ($1::jsonb)
     returning *;`,
    [JSON.stringify({ name: assessmentName })]
  )

  await DB.tx(async (client) => {
    // create schema
    const schema = DBNames.getAssessmentSchema(assessment.props.name)
    await DB.query(getCreateSchemaDDL(schema))
    assessment.cycles = await Promise.all(cycleNames.map((cycleName) => createCycle(assessment, cycleName, client)))
    // Set fra/2020 to published
    await client.query('update public.assessment_cycle set published = true where id = $1', [assessment.cycles[0].id])

    await migrateMetadata({ assessment, assessmentLegacy, schema, spec, client })
    await migrateAreas({ client, schema })
    await migrateUsers({ client })
    await migrateUsersAuthProvider({ client })
    await migrateUsersRole({ assessment, client })
    await migrateUsersInvitation({ client })
    await migrateUsersResetPassword({ client })
    await migrateTablesData({ assessment }, client)
    await migrateOdps({ assessment }, client)
    await migrateCountryStatus({ assessment }, client)

    await client.query(
      `delete
       from settings;
      insert into settings (default_assessment_id)
      values ($1)`,
      [assessment.id]
    )
  })
}

const assessmentName = 'fra'
const cycleNames = ['2020', '2025']

migrate({ assessmentName, cycleNames, spec: FraSpecs, assessmentLegacy: FRA })
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
