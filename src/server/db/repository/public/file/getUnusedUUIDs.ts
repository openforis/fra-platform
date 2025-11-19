import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessments: Array<Assessment>
}

export const getUnusedUUIDs = async (props: Props, client: BaseProtocol = DB): Promise<Array<string>> => {
  const { assessments } = props

  const whereRepository = assessments.flatMap((assessment) => {
    return assessment.cycles.map<string>((cycle) => {
      const schema = Schemas.getNameCycle(assessment, cycle)
      return `not exists (select 1 from ${schema}.repository where file_uuid = public.file.uuid)`
    })
  }).join(`
    and
    `)

  const query = `
      select uuid from public.file
      where ${whereRepository}
        and not exists (select 1 from public.users where profile_picture_file_uuid = public.file.uuid)
      `

  return client.map<string>(query, [], (row) => row.uuid)
}
