import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
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
  const { countryIso, description, fileUuid, folderName, link, parentUuid, props: _props = {} } = repositoryItem

  if (!RepositoryItems.isFolder(repositoryItem)) {
    if (fileUuid && link) throw new Error('Cannot create both file and link')
    if (!fileUuid && !link) throw new Error('No file or link provided')
  }

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      insert into ${schemaCycle}.repository (country_iso, description, file_uuid, folder_name, link, parent_uuid, props)
      values ($(countryIso), $(description), $(fileUuid), $(folderName), $(link), $(parentUuid), $(props))
      returning *
    `,
    {
      countryIso,
      description: description || null,
      fileUuid: fileUuid || null,
      folderName: folderName ?? null,
      link: link || null,
      parentUuid: parentUuid || null,
      props: _props,
    },
    (row) => Objects.camelize(row)
  )
}
