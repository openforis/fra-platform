import { Assessment, AssessmentMetaCache, AssessmentNames } from 'meta/assessment'
import { Cycle, CycleProps, CycleStatus } from 'meta/assessment/cycle'

import { getOneWithCycle } from 'server/controller/assessment/getOne'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/repository/assessment/assessment/getCreateSchemaDDL'

type Props = {
  assessment: Assessment
  cycleSource?: Cycle
  name: string
}

type Returned = Promise<{
  assessment: Assessment
  cycle: Cycle
}>

const defaultMetaCache: AssessmentMetaCache = {
  calculations: { dependants: {}, dependencies: {} },
  validations: { dependants: {}, dependencies: {} },
  variablesByTable: {},
}

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

export const create = async (params: Props, client: BaseProtocol = DB): Returned => {
  const { assessment, cycleSource, name } = params

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, { name } as Cycle)
  await DB.query(AssessmentRepository.getCreateSchemaCycleDDL(schemaAssessment, schemaCycle))
  if ([AssessmentNames.fra, AssessmentNames.fraTest].includes(assessment.props.name as AssessmentNames)) {
    await DB.query(AssessmentRepository.getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle))
  }

  const cycle = await client.one<Cycle>(
    `insert into assessment_cycle (assessment_id, name, props, cycle_uuid_source)
     values ($1, $2, $3, $4)
     returning *;`,
    [assessment.id, name, getDefaultProps(), cycleSource?.uuid]
  )

  // Init country user summary view
  await client.query(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))

  // Initialise meta_cache for assessment on cycle creation
  // cycle.uuid is required to initialise meta_cache
  await client.none(
    `
        update assessment a
        set meta_cache = jsonb_set(
                a.meta_cache,
                '{${cycle.uuid}}',
                $1::jsonb)
        where a.id = $2
    `,
    [JSON.stringify(defaultMetaCache), assessment.id]
  )

  return getOneWithCycle({ assessmentName: assessment.props.name, cycleName: cycle.name }, client)
}
