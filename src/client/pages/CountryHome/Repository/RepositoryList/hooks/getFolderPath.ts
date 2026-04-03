import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

export type FolderPath = {
  currentFolder: RepositoryItemTree | undefined
  folderPath: Array<RepositoryItemTree>
}

/**
 * Construct the full path to the folder for the given UUID
 * @param items - items to search
 * @param uuid - target folder UUID
 * @returns path to the folder and the folder itself as currentFolder
 */
export const getFolderPath = (items: Array<RepositoryItemTree>, uuid: string | undefined): FolderPath => {
  if (!uuid) return { currentFolder: undefined, folderPath: [] }

  const folderPath = items.reduce<Array<RepositoryItemTree>>((found, item) => {
    if (!Objects.isEmpty(found)) return found
    if (item.uuid === uuid) return [item]
    const childPath = getFolderPath(item.children, uuid).folderPath
    return Objects.isEmpty(childPath) ? [] : [item, ...childPath]
  }, [])

  return { currentFolder: folderPath.at(-1), folderPath }
}
