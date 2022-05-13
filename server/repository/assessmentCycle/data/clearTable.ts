import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  tableName: string
}

export const clearTable = async (props: Props, client: BaseProtocol = DB): Promise<TableData[]> => {
  const { assessment, cycle, countryISOs, tableName } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // TODO: Delete correct rows from schemaCycle.node
  return client.many<TableData>(
    `
      select e.* from  ${schemaCycle}.${tableName} e where e.country_iso in ($1:csv)

    `,
    [countryISOs]
  )
}
