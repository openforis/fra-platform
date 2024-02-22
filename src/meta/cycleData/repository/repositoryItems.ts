import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData/repository/repository'
import { CountryRouteParams } from 'meta/routes'

type GetFileURLProps = CountryRouteParams & {
  repositoryItem: RepositoryItem
}

const getURL = (props: GetFileURLProps) => {
  const { repositoryItem, assessmentName, cycleName, countryIso } = props
  const queryParams = new URLSearchParams({ assessmentName, cycleName, countryIso })

  if (repositoryItem.link) {
    return repositoryItem.link
  }

  return `${ApiEndPoint.CycleData.Repository.file(repositoryItem.uuid)}?${queryParams.toString()}`
}

const isGlobal = (props: { repositoryItem: RepositoryItem }): boolean => {
  const { repositoryItem } = props
  return !repositoryItem.countryIso
}

export const RepositoryItems = {
  getURL,
  isGlobal,
}
