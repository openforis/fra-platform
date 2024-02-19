import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  repositoryItem: RepositoryItem
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, countryIso, repositoryItem } = props
  const { fileUuid, link, props: _props } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      insert into ${schemaCycle}.repository (country_iso, file_uuid, link, props)
      values ($1, $2, $3, $4)
      returning *
    `,
    [countryIso, fileUuid, link, _props],
    (row) => Objects.camelize(row)
  )
}
