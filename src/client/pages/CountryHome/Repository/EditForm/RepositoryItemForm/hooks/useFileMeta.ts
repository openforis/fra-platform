import { useEffect, useState } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { FileMeta } from 'meta/file/meta'

import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = {
  fileMeta: FileMeta | undefined
  isLoading: boolean
}

export const useFileMeta = (repositoryItem: Partial<RepositoryItem> | undefined): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const [fileMeta, setFileMeta] = useState<FileMeta | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { fileUuid, uuid } = repositoryItem ?? {}

  useEffect(() => {
    if (!fileUuid || !uuid) return

    const fetchFileMeta = async (): Promise<void> => {
      setIsLoading(true)
      const url = ApiEndPoint.CycleData.Repository.fileMeta()
      const params = { assessmentName, cycleName, countryIso, uuid, fileUuid }
      const { data } = await axios.get<FileMeta>(url, { params })
      setFileMeta(data)
      setIsLoading(false)
    }

    fetchFileMeta()
  }, [assessmentName, countryIso, cycleName, fileUuid, uuid])

  return { fileMeta, isLoading }
}
