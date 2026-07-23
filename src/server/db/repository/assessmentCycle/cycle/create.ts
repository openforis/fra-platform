import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle, CycleName, CycleProps, CycleStatus } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

export type CreateCycleOptions = {
  name: CycleName
  props?: Partial<Cycle['props']>
  uuidSource?: UUID
}

type Props = {
  assessment: Assessment
  options: CreateCycleOptions
}

const getDefaultProps = (options: CreateCycleOptions): CycleProps => {
  const dateCreated = new Date().toISOString()
  return {
    ...options.props,
    status: CycleStatus.draft,
    dateCreated,
    dateDraft: dateCreated,
    dateEditing: undefined,
    datePublished: undefined,
  }
}

export const create = async (params: Props, client: BaseProtocol = DB): Promise<Cycle> => {
  const { assessment, options } = params
  const { name, uuidSource } = options

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, { name } as Cycle)

  // DDL schema init
  await DB.query(AssessmentRepository.getCreateSchemaCycleDDL(schemaAssessment, schemaCycle))

  if ([AssessmentNames.fra, AssessmentNames.fraTest].includes(assessment.props.name as AssessmentNames)) {
    await DB.query(AssessmentRepository.getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle))
  }

  // insert DML
  const cycle = await client.one<Cycle>(
    `insert into assessment_cycle (assessment_uuid, name, props, cycle_uuid_source)
     values ($1, $2, $3, $4)
     returning *;`,
    [assessment.uuid, name, getDefaultProps(options), uuidSource]
  )

  // Init country user summary view
  await client.query(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))

  return cycle
}
