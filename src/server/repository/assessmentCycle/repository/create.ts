import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  name: string
  fileUuid?: string
  link?: string
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, countryIso, fileUuid, link, name } = props

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      insert into ${schemaCycle}.repository (country_iso, name, file_uuid, link)
      values ($1, $2, $3, $4)
      returning *
    `,
    [countryIso, name, fileUuid, link],
    (row) => Objects.camelize(row)
  )
}
