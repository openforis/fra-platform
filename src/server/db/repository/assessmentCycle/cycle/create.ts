import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle, CycleProps, CycleStatus } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycleSource?: Cycle
  name: string
  withCountries?: boolean
}

// const defaultMetaCache: AssessmentMetaCache = {
//   calculations: { dependants: {}, dependencies: {} },
//   validations: { dependants: {}, dependencies: {} },
//   variablesByTable: {},
// }

const getDefaultProps = (): CycleProps => {
  const dateCreated = new Date().toISOString()
  return {
    status: CycleStatus.draft,
    dateCreated,
    dateDraft: dateCreated,
    dateEditing: undefined,
    datePublished: undefined,
  }
}

export const create = async (params: Props, client: BaseProtocol = DB): Promise<Cycle> => {
  const { assessment, cycleSource, name, withCountries } = params

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, { name } as Cycle)
  await DB.query(AssessmentRepository.getCreateSchemaCycleDDL(schemaAssessment, schemaCycle))
  if ([AssessmentNames.fra, AssessmentNames.fraTest].includes(assessment.props.name as AssessmentNames)) {
    await DB.query(AssessmentRepository.getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle))
  }

  const cycle = await client.one<Cycle>(
    `insert into assessment_cycle (assessment_uuid, name, props, cycle_uuid_source)
     values ($1, $2, $3, $4)
     returning *;`,
    [assessment.uuid, name, getDefaultProps(), cycleSource?.uuid]
  )

  if (withCountries) {
    // Init countries
    await client.query(`
      insert into ${schemaCycle}.country (country_iso)
      select country_iso
      from country
  `)
  }

  // Init country user summary view
  await client.query(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))

  return cycle
}
