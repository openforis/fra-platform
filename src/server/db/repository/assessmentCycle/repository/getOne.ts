import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
} & ({ uuid: string } | { fileName: string } | { fileUuid: string })

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let values: Array<string>
  let where: string

  if ('uuid' in props) {
    values = [props.uuid]
    where = 'uuid = $1'
  } else if ('fileName' in props) {
    values = [props.fileName]
    where = "props -> 'translation' ->> 'en' = $1"
  } else {
    values = [props.fileUuid]
    where = 'file_uuid = $1'
  }

  return client.one<RepositoryItem>(
    `
      select * from ${schemaCycle}.repository
      where ${where}
    `,
    values,
    (row) => Objects.camelize(row)
  )
}
