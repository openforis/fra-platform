import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  repositoryItem: Omit<RepositoryItem, 'id' | 'uuid'>
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, repositoryItem } = props
  const assessmentUuid = assessment.uuid
  const cycleUuid = cycle.uuid
  const { countryIso, fileUuid, link, props: _props } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  return client.one<RepositoryItem>(
    `
      insert into public.repository (assessment_uuid, cycle_uuid, country_iso, file_uuid, link, props)
      values ($(assessmentUuid), $(cycleUuid), $(countryIso), $(fileUuid), $(link), $(props))
      returning *
    `,
    { assessmentUuid, cycleUuid, countryIso, fileUuid, link, props: _props },
    (row) => Objects.camelize(row)
  )
}
