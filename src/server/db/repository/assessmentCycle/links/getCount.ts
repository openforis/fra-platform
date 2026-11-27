import { TablePaginatedCount } from 'meta/tablePaginated/count'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { LinksGetManyProps } from 'server/db/repository/assessmentCycle/links/linksGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/assessmentCycle/links/utils/getPropsToQueryParams'
import { Schemas } from 'server/db/schemas'

export const getCount = async (props: LinksGetManyProps, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.one(
    `
        select count(l.id) as total
        from ${schemaCycle}.link l
        where ${whereConditions.join(' and ')}
    `,
    queryParams,
    (res) => Objects.camelize(res)
  )
}
