import { useEffect, useState } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryFolder } from 'meta/cycleData/repository/folder'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useCountryRouteParams } from 'client/hooks/routeParams'

// Placeholder file to populate UI from backend: Will be moved to redux

export type FolderNode = RepositoryFolder & {
  children: Array<FolderNode>
  // count: how many items folder contains
  count: number
}

type Returned = {
  tree: Array<FolderNode>
  items: Array<RepositoryItem>
}

// TODO Move to Redux
const buildTree = (folders: Array<RepositoryFolder>, counts: Record<string, number>): Array<FolderNode> => {
  // build map with counts and empty children
  const map: Record<string, FolderNode> = Object.fromEntries(
    folders.map((f) => [f.uuid, { ...f, children: [] as Array<FolderNode>, count: counts[f.uuid] ?? 0 }])
  )

  return folders.reduce<Array<FolderNode>>((roots, f) => {
    if (f.parentUuid) map[f.parentUuid].children.push(map[f.uuid])
    else roots.push(map[f.uuid])
    return roots
  }, [])
}

// TODO Move to Redux
type ApiResponse = {
  items: Array<RepositoryItem>
  folders: Array<RepositoryFolder>
}

// TODO Move to Redux
export const useItems = (): Returned | undefined => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const [data, setData] = useState<Returned | undefined>(undefined)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const params = { assessmentName, cycleName, countryIso, global: false }
      const { data: apiData } = await axios.get<ApiResponse>(ApiEndPoint.CycleData.Repository.many(), { params })

      // TODO: Merge with buildTree
      const counts = apiData.items.reduce<Record<string, number>>((acc, item) => {
        if (item.folderUuid) acc[item.folderUuid] = (acc[item.folderUuid] ?? 0) + 1
        return acc
      }, {})

      setData({ tree: buildTree(apiData.folders, counts), items: apiData.items })
    }

    fetch()
  }, [assessmentName, countryIso, cycleName])

  return data
}
