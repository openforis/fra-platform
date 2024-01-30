import { useCallback, useState } from 'react'

import { RepositoryEdit } from 'client/pages/CountryHome/Repository/Panel/repositoryEdit'

type OnChange = (name: string, value: string | File) => void

type Returned = {
  file: RepositoryEdit | null
  onChange: OnChange
}

export const useOnChange = (): Returned => {
  const [file, setFile] = useState<RepositoryEdit | null>(null)
  const onChange = useCallback<OnChange>(
    (name: string, value: string | File) => {
      if (name === 'file') {
        setFile({ ...file, file: value as File })
      } else {
        setFile({ ...file, [name]: value })
      }
    },
    [file]
  )
  return { file, onChange }
}
