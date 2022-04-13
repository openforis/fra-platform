import * as path from 'path'
import { config } from 'dotenv'

import { FRA } from '../../core/assessment'
import { Assessment as AssessmentLegacy } from '../../core/assessment/assessment'
import { Assessment } from '../../meta/assessment/assessment'
import { Cycle } from '../../meta/assessment/cycle'
import { BaseProtocol, DB } from '../../server/db'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from '../../server/repository/assessment/assessment/getCreateSchemaDDL'
import { SectionSpec } from '../../webapp/sectionSpec'
import { migrateOdps } from './migrateData/migrateOdps'
import { migrateTablesData } from './migrateData/migrateTablesData'
import { DBNames } from './_DBNames'
import { FraSpecs } from './fraSpecs'
import { generateMetaCache } from './generateMetaCache'
import { migrateAreas } from './migrateAreas'
import { migrateMetadata } from './migrateMetadata'
import { migrateUsers } from './migrateUsers'
import { migrateUsersAuthProvider } from './migrateUsersAuthProvider'
import { migrateUsersInvitation } from './migrateUsersInvitation'
import { migrateUsersResetPassword } from './migrateUsersResetPassword'
import { migrateUsersRole } from './migrateUsersRole'

config({ path: path.resolve(__dirname, '..', '..', '.env') })

const createCycle = async (assessment: Assessment, cycleName: string, client: BaseProtocol): Promise<Cycle> => {
  await DB.query(
    getCreateSchemaCycleDDL(
      DBNames.getAssessmentSchema(assessment.props.name),
      DBNames.getCycleSchema(assessment.props.name, cycleName)
    )
  )

  await client.query(
    getCreateSchemaCycleOriginalDataPointViewDDL(DBNames.getCycleSchema(assessment.props.name, cycleName))
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

  await DB.tx(async (client) => {
    // insert assessment
    const assessment = await client.one<Assessment>(
      `insert into assessment (props)
       values ($1::jsonb)
       returning *;`,
      [JSON.stringify({ name: assessmentName })]
    )

    // create schema
    const schema = DBNames.getAssessmentSchema(assessment.props.name)
    await DB.query(getCreateSchemaDDL(schema))
    assessment.cycles = await Promise.all(cycleNames.map((cycleName) => createCycle(assessment, cycleName, client)))
    // Set fra/2020 to published
    await client.query('update public.assessment_cycle set published = true where id = $1', [assessment.cycles[0].id])
    await client.query('update public.assessment set props = $2:json::jsonb where id = $1', [
      assessment.id,
      {
        ...assessment.props,
        defaultCycle: assessment.cycles[0].uuid,
      },
    ])

    await migrateMetadata({ assessment, assessmentLegacy, schema, spec, client })

    await Promise.all(
      cycleNames.map((cycleName, index: number) =>
        migrateAreas({ client, schema: DBNames.getCycleSchema(assessment.props.name, cycleName), index })
      )
    )

    await migrateUsers({ client })
    await migrateUsersAuthProvider({ client })
    await migrateUsersRole({ assessment, client })
    await migrateUsersInvitation({ client })
    await migrateUsersResetPassword({ client })
    await migrateTablesData({ assessment }, client)
    await migrateOdps({ assessment }, client)
    await generateMetaCache({ assessment }, client)

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
