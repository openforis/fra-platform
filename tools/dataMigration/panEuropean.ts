import 'tsconfig-paths/register'
import 'dotenv/config'

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
import { PanEuropeanSpecs } from '../../src/test/sectionSpec/PanEuropeanSpecs'
import { migrateTablesData } from './migrateData/migrateTablesData'
import { DBNames } from './_DBNames'
import { generateMetaCache } from './generateMetaCache'
import { migrateAreas } from './migrateAreas'
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
  legacySchemaName: string
  assessmentLegacy: AssessmentLegacy
  cycleNames: Array<string>
  spec: Record<string, SectionSpec>
}): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('========== START ', new Date().getTime())
  const { assessmentName, legacySchemaName, assessmentLegacy, cycleNames, spec } = props

  // eslint-disable-next-line no-console
  console.log('========== 1. delete old assessment')
  // ==== 1. delete old assessment
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
  const client = DB
  // await DB.tx(async (client) => {

  // eslint-disable-next-line no-console
  console.log('========== 2. create assessment')
  // ==== 2. create assessment
  const assessment = await client.one<Assessment>(
    `insert into assessment (props)
       values ($1::jsonb)
       returning *;`,
    [JSON.stringify({ name: assessmentName })]
  )

  // create schema
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  await DB.query(getCreateSchemaDDL(schema))
  // ==== 2 END. create assessment

  // ==== 3. create cycles
  // eslint-disable-next-line no-console
  console.log('========== 3. create cycles')
  assessment.cycles = await Promise.all(cycleNames.map((cycleName) => createCycle(assessment, cycleName, client)))

  // Set cycle 2020 to published
  const defaultCycle = assessment.cycles.find((c) => c.name === '2020')
  await client.query('update public.assessment_cycle set published = true where id = $1', [defaultCycle.id])
  await client.query('update public.assessment set props = $2:json::jsonb where id = $1', [
    assessment.id,
    {
      ...assessment.props,
      defaultCycle: defaultCycle.uuid,
    },
  ])
  // ==== 3 END. create cycles

  // ==== 4. migrate metadata
  // eslint-disable-next-line no-console
  console.log('========== 4. migrate metadata')
  await migrateMetadata({ assessment, assessmentLegacy, spec, client })
  // ==== 4 END. migrate metadata

  await Promise.all(
    cycleNames.map((cycleName, index: number) =>
      migrateAreas({ client, schema: DBNames.getCycleSchema(assessment.props.name, cycleName), index })
    )
  )

  // ==== 5. migrate data
  // eslint-disable-next-line no-console
  console.log('========== 5. migrate data')
  await Promise.all(
    assessment.cycles.map(async (cycle) => {
      // eslint-disable-next-line no-console
      console.log(`========== 5.1. migrate tables data ${cycle.name}`)
      await migrateTablesData({ assessment, cycle }, client, legacySchemaName)
      // eslint-disable-next-line no-console
      console.log(`========== 5.2. generateMetaCache ${cycle.name}`)
      await generateMetaCache({ assessment, cycle }, client)
    })
  )
  // ==== 5 END. migrate data
  // })
}

const assessmentName = 'panEuropean'
const cycleNames = ['2020', '2025']
const legacySchemaName = '_legacy_pan_european'

migrate({ assessmentName, cycleNames, legacySchemaName, spec: PanEuropeanSpecs, assessmentLegacy: PanEuropean })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('========== END ', new Date().getTime())
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
