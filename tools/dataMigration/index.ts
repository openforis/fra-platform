import * as path from 'path'
import { config } from 'dotenv'

import { FRA } from '../../.src.legacy/core/assessment'
import { Assessment as AssessmentLegacy } from '../../.src.legacy/core/assessment/assessment'
import { SectionSpec } from '../../.src.legacy/webapp/sectionSpec'
import { Assessment } from '../../src/meta/assessment/assessment'
import { Cycle } from '../../src/meta/assessment/cycle'
import { BaseProtocol, DB } from '../../src/server/db'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaDDL,
} from '../../src/server/repository/assessment/assessment/getCreateSchemaDDL'
import { FraSpecs } from '../../src/test/sectionSpec/fraSpecs'
import { migrateAggregates } from './migrateData/migrateAggregates'
import { migrateOdps } from './migrateData/migrateOdps'
import { migrateTablesData } from './migrateData/migrateTablesData'
import { DBNames } from './_DBNames'
import { generateMetaCache } from './generateMetaCache'
import { migrateActivityLog } from './migrateActivityLog'
import { migrateAreas } from './migrateAreas'
import { migrateMetadata } from './migrateMetadata'
import { migrateRepository } from './migrateRepository'
import { migrateReview } from './migrateReview'
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
    const defaultCycle = assessment.cycles.find((c) => c.name === '2020')
    await client.query('update public.assessment_cycle set published = true where id = $1', [defaultCycle.id])
    await client.query('update public.assessment set props = $2:json::jsonb where id = $1', [
      assessment.id,
      {
        ...assessment.props,
        defaultCycle: defaultCycle.uuid,
      },
    ])

    await migrateMetadata({ assessment, assessmentLegacy, schema, spec, client })
    await migrateRepository({ assessment, client })

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
    await Promise.all(
      assessment.cycles.map(async (cycle) => {
        await migrateTablesData({ assessment, cycle }, client)
      })
    )
    await migrateOdps({ assessment }, client)
    await migrateAggregates({ assessment }, client)
    await generateMetaCache({ assessment }, client)
    await migrateReview({ assessment }, client)
    await migrateActivityLog({ assessment }, client)

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
