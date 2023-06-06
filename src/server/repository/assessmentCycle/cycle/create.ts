import { Assessment, AssessmentMetaCache, Cycle } from 'meta/assessment'

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
): Promise<Assessment> => {
  const { assessment, name } = params

  await DB.query(
    AssessmentRepository.getCreateSchemaCycleDDL(Schemas.getName(assessment), Schemas.getNameCycle(assessment, { name } as Cycle))
  )

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

  return {
    ...assessment,
    cycles: [...(assessment.cycles ?? []), cycle],
  }
}
