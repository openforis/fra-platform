import * as path from 'path'
import { config } from 'dotenv'

import { PanEuropean } from '../../.src.legacy/core/assessment'
import { Assessment as AssessmentLegacy } from '../../.src.legacy/core/assessment/assessment'
import { SectionSpec } from '../../.src.legacy/webapp/sectionSpec'
import { Assessment } from '../../src/meta/assessment/assessment'
import { Cycle } from '../../src/meta/assessment/cycle'
import { BaseProtocol, DB } from '../../src/server/db'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaDDL,
} from '../../src/server/repository/assessment/assessment/getCreateSchemaDDL'
// TODO: import PanEuropeanSpecs
import { FraSpecs } from '../../src/test/sectionSpec/fraSpecs'
// import { migrateTablesData } from './migrateData/migrateTablesData'
import { DBNames } from './_DBNames'
// import { generateMetaCache } from './generateMetaCache'
import { migrateMetadata } from './migrateMetadata'

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
  // eslint-disable-next-line no-console
  console.log('========== START ', new Date().getTime())
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

    await migrateMetadata({ assessment, assessmentLegacy, spec, client })
    // await migrateRepository({ assessment, client })

    // await Promise.all(
    //   cycleNames.map((cycleName, index: number) =>
    //     migrateAreas({ client, schema: DBNames.getCycleSchema(assessment.props.name, cycleName), index })
    //   )
    // )

    // await migrateUsers({ client })
    // await migrateUsersAuthProvider({ client })
    // await migrateUsersRole({ assessment, client })
    // await migrateUsersInvitation({ client })
    // await migrateUsersResetPassword({ client })

    // TODO: ==== needed - migrate data
    // await Promise.all(
    //   assessment.cycles.map(async (cycle) => {
    //     await migrateTablesData({ assessment, cycle }, client)
    //     await generateMetaCache({ assessment, cycle }, client)
    //   })
    // )
    // TODO: ==== end needed - migrate data

    // await migrateOdps({ assessment }, client)
    // await migrateAggregates({ assessment }, client)
    // await migrateReview({ assessment }, client)
    // await migrateActivityLog({ assessment }, client)

    // await client.query(
    //   `delete
    //    from settings;
    //   insert into settings (default_assessment_id)
    //   values ($1)`,
    //   [assessment.id]
    // )
  })
}

const assessmentName = 'pan_european'
const cycleNames = ['2020', '2025']

// TODO:
// migrate({ assessmentName, cycleNames, spec: PanEuropeanSpecs, assessmentLegacy: PanEuropean })
migrate({ assessmentName, cycleNames, spec: FraSpecs, assessmentLegacy: PanEuropean })
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
