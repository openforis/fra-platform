import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Repository } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  name: string
  fileUuid?: string
  link?: string
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<Repository> => {
  const { assessment, cycle, countryIso, fileUuid, link, name } = props

  if (fileUuid && link) throw new Error('Cannot create both fileUuid and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<Repository>(
    `
      insert into ${schemaCycle}.repository (country_iso, name, file_uuid, link)
      values ($1, $2, $3, $4)
      returning *
    `,
    [countryIso, name, fileUuid, link],
    (row) => Objects.camelize(row)
  )
}
