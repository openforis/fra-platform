import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
} & ({ uuid: string } | { fileName: string } | { fileUuid: string })

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let values: string[]
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
