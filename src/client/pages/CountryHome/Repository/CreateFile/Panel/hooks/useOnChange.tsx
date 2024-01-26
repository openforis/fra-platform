import { useCallback, useState } from 'react'

import { NewFile } from 'client/pages/CountryHome/Repository/CreateFile/Panel/newFile'

type OnChange = (name: string, value: string | File) => void

type Returned = {
  file: NewFile | null
  onChange: OnChange
}

export const useOnChange = (): Returned => {
  const [file, setFile] = useState<NewFile | null>(null)
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
