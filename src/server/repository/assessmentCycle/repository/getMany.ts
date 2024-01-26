import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Repository } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  files?: boolean
  links?: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Repository>> => {
  const { assessment, cycle, countryIso, links, files } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let condition = ''

  if (files) {
    condition = 'and file_uuid is not null'
  }

  if (links) {
    condition = 'and link is not null'
  }

  return client.map<Repository>(
    `
      select * from ${schemaCycle}.repository
               where
                -- country iso is the given country iso or null,
                --  when it's null, the entry shown for all countries, unless it's hidden
                   (country_iso = $1 or country_iso is null) and (props ->> 'hidden')::boolean is not true
                   ${condition}
    `,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
