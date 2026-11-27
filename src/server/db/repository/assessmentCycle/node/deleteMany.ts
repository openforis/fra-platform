import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  colUuids: Array<string>
}

export const deleteMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, colUuids, countryIso, cycle } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.query(
    `delete
       from ${schemaCycle}.node n
       where n.country_iso = $1
         and n.col_uuid in ($2:list)`,
    [countryIso, colUuids]
  )
}
