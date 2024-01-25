import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryEntity } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  name: string
  file?: Express.Multer.File
  link?: string
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryEntity> => {
  const { assessment, cycle, countryIso, file, link, name } = props

  if (file && link) throw new Error('Cannot create both file and link')
  if (!file && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let uuid = null
  if (file) {
    const result = await client.one(`insert into public.file (file_name, file) values ($1, $2) returning uuid`, [
      file.originalname,
      file.buffer,
    ])
    uuid = result.uuid
  }

  return client.one<RepositoryEntity>(
    `
      insert into ${schemaCycle}.repository (country_iso, name, file_uuid, link)
      values ($1, $2, $3, $4)
      returning *
    `,
    [countryIso, name, uuid, link],
    (row) => Objects.camelize(row)
  )
}
