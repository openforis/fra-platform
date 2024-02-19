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

  return `${ApiEndPoint.CycleData.Repository.file(datum.uuid)}?${queryParams.toString()}`
}

export const RepositoryItems = {
  getURL,
}
