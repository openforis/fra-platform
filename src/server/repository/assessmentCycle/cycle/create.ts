import { Assessment, AssessmentMetaCache, AssessmentNames, Cycle } from 'meta/assessment'

import { getOneWithCycle } from 'server/controller/assessment/getOne'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

const defaultMetaCache: AssessmentMetaCache = {
  calculations: { dependants: {}, dependencies: {} },
  validations: { dependants: {}, dependencies: {} },
  variablesByTable: {},
}

export const create = async (
  params: {
    assessment: Assessment
    name: string
  },
  client: BaseProtocol = DB
): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  const { assessment, name } = params

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, { name } as Cycle)
  await DB.query(AssessmentRepository.getCreateSchemaCycleDDL(schemaAssessment, schemaCycle))
  if ([AssessmentNames.fra, AssessmentNames.fraTest].includes(assessment.props.name as AssessmentNames)) {
    await DB.query(AssessmentRepository.getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle))
  }

  const cycle = await client.one<Cycle>(
    `insert into assessment_cycle (assessment_id, name)
     values ($1, $2)
     returning *;`,
    [assessment.id, name]
  )

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
