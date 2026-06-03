import { useEffect, useState } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { BaseFileSummary } from 'meta/file/file'

import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = {
  fileSummary: BaseFileSummary | undefined
  isLoading: boolean
}

type FileMetaResponse = {
  name: string
  size: number
}

export const useFileMeta = (repositoryItem: Partial<RepositoryItem> | undefined): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const [fileSummary, setBaseFileSummary] = useState<BaseFileSummary | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { fileUuid, uuid } = repositoryItem ?? {}

  useEffect(() => {
    setBaseFileSummary(undefined)
    if (!fileUuid || !uuid) return

    const fetchFileMeta = async (): Promise<void> => {
      setIsLoading(true)
      const url = ApiEndPoint.CycleData.Repository.fileMeta()
      const params = { assessmentName, cycleName, countryIso, uuid }
      const { data } = await axios.get<FileMetaResponse | null>(url, { params })
      if (data) setBaseFileSummary({ name: data.name, size: data.size, repositoryItemUuid: uuid })
      setIsLoading(false)
    }

    fetchFileMeta()
  }, [assessmentName, countryIso, cycleName, fileUuid, uuid])

  return { fileSummary, isLoading }
}
