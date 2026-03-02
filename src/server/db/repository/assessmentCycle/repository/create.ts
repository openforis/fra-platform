import { AreaCode } from 'meta/area/areaCode'
import { CycleUuid } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  cycleUuid: CycleUuid
  countryIso: AreaCode
  repositoryItem: Omit<RepositoryItem, 'id' | 'uuid'>
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { cycleUuid, repositoryItem } = props
  const { countryIso, fileUuid, link, props: _props } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  return client.one<RepositoryItem>(
    `
      insert into public.repository (cycle_uuid, country_iso, file_uuid, link, props)
      values ($1, $2, $3, $4, $5)
      returning *
    `,
    [cycleUuid, countryIso, fileUuid, link, _props],
    (row) => Objects.camelize(row)
  )
}
