import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

type BaseQueryParams = Record<string, string | undefined>

export const useSearchParams = <SearchParams extends BaseQueryParams>(): Partial<SearchParams> => {
  const { search } = useLocation()

  return useMemo(() => {
    const params = new URLSearchParams(search)
    return Object.fromEntries(params) as Partial<SearchParams>
  }, [search])
}
