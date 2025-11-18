import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { CountryRouteParams } from 'meta/routes/routeParams/country'

type GetFileURLProps = CountryRouteParams & {
  repositoryItem: RepositoryItem
}

const getURL = (props: GetFileURLProps): string => {
  const { assessmentName, countryIso, cycleName, repositoryItem: datum } = props
  const queryParams = new URLSearchParams({ assessmentName, cycleName, countryIso })

  if (datum.link) {
    return datum.link
  }

  return `${ApiEndPoint.CycleData.Repository.File.one(datum.uuid)}?${queryParams.toString()}`
}

const isGlobal = (props: { repositoryItem: RepositoryItem }): boolean => {
  const { repositoryItem } = props
  return !repositoryItem.countryIso
}

export const RepositoryItems = {
  getURL,
  isGlobal,
}
