import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData/repository/repository'
import { CountryRouteParams } from 'meta/routes'

type GetFileURLProps = CountryRouteParams & {
  repositoryItem: RepositoryItem
}

const getURL = (props: GetFileURLProps) => {
  const { repositoryItem: datum, assessmentName, cycleName, countryIso } = props
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
