import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  repositoryItem: Omit<RepositoryItem, 'id' | 'uuid'>
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, repositoryItem } = props
  const { countryIso, description, fileUuid, link, parentUuid, props: _props } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      insert into ${schemaCycle}.repository (country_iso, description, file_uuid, link, parent_uuid, props)
      values ($1, $2, $3, $4, $5, $6)
      returning *
    `,
    [countryIso, description, fileUuid, link, parentUuid, _props],
    (row) => Objects.camelize(row)
  )
}
