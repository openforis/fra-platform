import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
} & ({ uuid: string } | { fileName: string })

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const values = 'uuid' in props ? [props.uuid] : [props.fileName]
  const where = 'uuid' in props ? 'uuid = $1' : "props -> 'translation' ->> 'en' = $1"

  return client.one<RepositoryItem>(
    `
      select * from ${schemaCycle}.repository
      where ${where}
    `,
    values,
    (row) => Objects.camelize(row)
  )
}
