import { Objects } from 'utils/objects'

import { Lang } from 'meta/lang'

import { CountrySummaryGetManyProps } from 'server/repository/assessmentCycle/countrySummary/countrySummaryGetManyProps'
import { CountrySummaryQueryParams } from 'server/repository/assessmentCycle/countrySummary/CountrySummaryQueryParams'

type Returned = { whereConditions: Array<string>; queryParams: CountrySummaryQueryParams }

export const getPropsToQueryParams = (props: CountrySummaryGetManyProps): Returned => {
  const { filters = {}, lang = Lang.en, limit, offset } = props

  const { countries, statuses } = filters

  const queryParams: CountrySummaryQueryParams = { lang }

  const hasCountries = !Objects.isEmpty(countries)
  if (hasCountries) queryParams.countries = countries

  const hasStatuses = !Objects.isEmpty(statuses)
  if (hasStatuses) queryParams.statuses = statuses

  if (!Objects.isNil(limit)) queryParams.limit = limit
  if (!Objects.isNil(offset)) queryParams.offset = offset

  const whereConditions = [
    hasCountries && `country_iso in ($(countries:list))`,
    hasStatuses && `status in ($(statuses:list))`,
  ].filter(Boolean)

  return { queryParams, whereConditions }
}
