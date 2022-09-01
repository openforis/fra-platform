import { BaseProtocol } from '../../../src/server/db'
import { Objects } from '../../../src/utils/objects'

export type IssueLegacy = {
  id: number
  countryIso: string
  section: string
  status: 'opened' | 'resolved'
  target: Array<string>
}

export const getIssuesLegacy = (props: { odp: boolean }, client: BaseProtocol): Promise<Array<IssueLegacy>> =>
  client.map<IssueLegacy>(
    `select i.id,
            i.country_iso,
            i.section,
            i.status,
            i.target -> 'params' as target
     from _legacy.issue i
     where i.section ${props.odp ? `='odp'` : `not in ('odp', 'panEuropeanIndicators')`} 
     order by 1, 2, 3`,
    [],
    // @ts-ignore
    Objects.camelize
  )
