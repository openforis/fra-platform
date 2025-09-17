import { Objects } from 'utils/objects'

import { LinksGetManyProps } from 'server/repository/assessmentCycle/links/linksGetManyProps'
import { LinksQueryParams } from 'server/repository/assessmentCycle/links/LinksQueryParams'

type Returned = { whereConditions: Array<string>; queryParams: LinksQueryParams }

export const getPropsToQueryParams = (props: LinksGetManyProps): Returned => {
  const { filters = {}, limit, offset } = props

  const { approved, codes, excludeDeleted = true } = filters

  const queryParams: LinksQueryParams = {}

  if (!Objects.isNil(approved)) queryParams.approved = approved
  if (!Objects.isNil(excludeDeleted)) queryParams.excludeDeleted = excludeDeleted

  const hasCodes = !Objects.isEmpty(codes)
  if (hasCodes) queryParams.codes = codes

  if (!Objects.isNil(limit)) queryParams.limit = limit
  if (!Objects.isNil(offset)) queryParams.offset = offset

  const whereConditions = [
    approved && `jsonb_exists(props, 'approved') AND (props ->> 'approved')::boolean = $(approved)`,
    excludeDeleted && `(props->>'deleted')::boolean is distinct from true`,
    hasCodes &&
      `(
      select v->>'code' 
      from jsonb_array_elements(visits) as v 
      order by (v->>'timestamp')::bigint desc 
      limit 1
    ) in ($(codes:list))`,
  ].filter(Boolean)

  return { queryParams, whereConditions }
}
