import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: CountryIso
} & ({ uuid: string } | { fileName: string })

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, countryIso, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const values = 'uuid' in props ? [props.uuid] : [props.fileName]
  let where = 'uuid' in props ? 'uuid = $1' : "props -> 'translation' ->> 'en' = $1"

  if (!Objects.isEmpty(countryIso)) {
    values.push(countryIso)
    where = `${where} AND country_iso = $2`
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
