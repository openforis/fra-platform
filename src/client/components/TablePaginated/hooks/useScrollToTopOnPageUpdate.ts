import { MutableRefObject } from 'react'

import { Objects } from 'utils/objects'

import { useTablePaginatedData, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useOnUpdate } from 'client/hooks'

type Props = {
  divRef: MutableRefObject<HTMLDivElement>
  path: string
}

export const useScrollToTopOnPageUpdate = (props: Props): void => {
  const { divRef, path } = props

  const data = useTablePaginatedData(path)
  const page = useTablePaginatedPage(path)

  useOnUpdate(() => {
    if (!Objects.isNil(data)) {
      setTimeout(() => {
        const opts: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start', inline: 'nearest' }
        divRef.current?.parentElement?.parentElement?.scrollIntoView(opts)
      })
    }
  }, [page])
}
