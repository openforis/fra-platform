import { Objects } from 'utils/objects'

import { AssessmentBase } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { getOne } from 'server/repository/assessment/assessment/getOne'

type Props = { assessment: Pick<AssessmentBase, 'props'> }

export const createAssessment = async (params: Props, client: BaseProtocol = DB): Promise<AssessmentBase> => {
  const { assessment } = params

  const assessmentCreated = await client.one<AssessmentBase>(
    `
        insert into assessment (props)
        values ('${JSON.stringify(assessment.props)}'::jsonb)
        returning *;`,
    [],
    Objects.camelize
  )
  return getOne({ id: assessmentCreated.id }, client)
}
