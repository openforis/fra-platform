import { Objects } from 'utils/objects'

import { LinksGetManyProps } from 'server/db/repository/assessmentCycle/links/linksGetManyProps'
import { LinksQueryParams } from 'server/db/repository/assessmentCycle/links/LinksQueryParams'

type Returned = { whereConditions: Array<string>; queryParams: LinksQueryParams }

export const getPropsToQueryParams = (props: LinksGetManyProps): Returned => {
  const { filters = {}, limit, offset } = props

  const { approved, codes, countries, excludeDeleted = true } = filters

  const queryParams: LinksQueryParams = { excludeDeleted }

  if (!Objects.isNil(approved)) queryParams.approved = approved

  const hasCodes = !Objects.isEmpty(codes)
  if (hasCodes) queryParams.codes = codes

  const hasCountries = !Objects.isEmpty(countries)
  if (hasCountries) queryParams.countries = countries

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
    hasCountries && `country_iso in ($(countries:list))`,
  ].filter(Boolean)

  return { queryParams, whereConditions }
}
