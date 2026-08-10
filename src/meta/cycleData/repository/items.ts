import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'
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

const getName = (item: Pick<RepositoryItem, 'folderName' | 'props'>): string =>
  item.folderName ?? item.props?.translation?.en

const isFolder = (item: Pick<RepositoryItem, 'folderName'>): boolean => typeof item.folderName === 'string'

const isLink = (item: Pick<RepositoryItem, 'folderName' | 'link'>): boolean => !isFolder(item) && Boolean(item.link)

// Recursively collect all folder UUIDs from a tree
const getFolderUuids = (items: Array<RepositoryItemTree>): Array<string> =>
  items.reduce<Array<string>>((acc, item) => {
    if (!isFolder(item)) return acc
    return [...acc, item.uuid, ...getFolderUuids(item.children)]
  }, [])

const isGlobal = (props: { repositoryItem: RepositoryItem }): boolean => {
  const { repositoryItem } = props
  return !repositoryItem.countryIso
}

export const RepositoryItems = {
  getFolderUuids,
  getName,
  getURL,
  isFolder,
  isGlobal,
  isLink,
}
