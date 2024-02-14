import { Dispatch, SetStateAction, useCallback } from 'react'

import type { Jodit } from 'jodit-react'

import { CountryIso } from 'meta/area'
import { AssessmentFile, AssessmentFiles } from 'meta/cycleData'

import { useUpdateAccess } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  editor: Jodit
  setEditor: Dispatch<SetStateAction<Jodit>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

type Returned = (files: Array<AssessmentFile>) => void

export const useOnClose = (props: Props): Returned => {
  const { setIsOpen, setEditor, editor } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const updateAccess = useUpdateAccess()

  return useCallback<Returned>(
    (files: Array<AssessmentFile>) => {
      setIsOpen(false)
      if (!files.length) return

      const mapFunction = (file: AssessmentFile) => {
        const { uuid } = file
        const hrefProps = { assessmentName, cycleName, countryIso, uuid }
        return `<a href="${AssessmentFiles.getHref(hrefProps)}" target="_blank">${file.fileName}</a>`
      }

      // When adding a file from file repository, we make it public
      const fileCountryIso = files[0]?.countryIso
      updateAccess({ fileCountryIso, files, public: true })

      const linksString = files.map(mapFunction).join(' ')
      editor?.s.insertHTML(linksString)
      setEditor(null)
    },
    [setIsOpen, updateAccess, editor?.s, setEditor, assessmentName, cycleName, countryIso]
  )
}
