import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryEntity, RepositoryFile, RepositoryLink } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type BaseProps = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  name: string
}

type Props = BaseProps & {
  file?: Express.Multer.File
  link?: string
}

type CreateLinkProps = BaseProps & {
  link: string
}

type CreateFileProps = BaseProps & {
  file: Express.Multer.File
}

const _createLink = async (props: CreateLinkProps, client: BaseProtocol = DB): Promise<RepositoryLink> => {
  const { assessment, cycle, countryIso, name, link } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryLink>(
    `
      insert into ${schemaCycle}.repository (country_iso, name, link)
      values ($1, $2, $3)
      returning *
    `,
    [countryIso, name, link],
    (row) => Objects.camelize(row)
  )
}

const _createFile = async (props: CreateFileProps, client: BaseProtocol = DB): Promise<RepositoryFile> => {
  const { assessment, cycle, countryIso, name, file } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const { uuid } = await client.one(`insert into public.file (file_name, file) values ($1, $2) returning uuid`, [
    file.originalname,
    file.buffer,
  ])

  return client.one<RepositoryFile>(
    `
      insert into ${schemaCycle}.repository (country_iso, name, file_uuid)
      values ($1, $2, $3)
      returning *
    `,
    [countryIso, name, uuid],
    (row) => Objects.camelize(row)
  )
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryEntity> => {
  const { assessment, cycle, countryIso, file, link, name } = props

  if (!file && !link) throw new Error('No file or link provided')

  if (file) {
    return _createFile({ assessment, cycle, countryIso, name, file }, client)
  }

  return _createLink({ assessment, cycle, countryIso, name, link }, client)
}
