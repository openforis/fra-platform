import { useCallback } from 'react'

import type { Jodit } from 'jodit/types/jodit'

import { CountryIso } from 'meta/area'
import { AssessmentFile, AssessmentFiles } from 'meta/cycleData'

import { useUpdateAccess } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnClose = (props: {
  setIsOpen: (isOpen: boolean) => void
  setEditor: (editor: Jodit) => void
  editor: Jodit
}) => {
  const { setIsOpen, setEditor, editor } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const updateAccess = useUpdateAccess()

  return useCallback(
    (selectedFiles: Array<AssessmentFile>) => {
      setIsOpen(false)
      if (!selectedFiles.length) return

      const mapFunction = (file: AssessmentFile) => {
        const { uuid } = file
        const hrefProps = { assessmentName, cycleName, countryIso, uuid }
        return `<a href="${AssessmentFiles.getHref(hrefProps)}" target="_blank">${file.fileName}</a>`
      }
      // When adding a file from file repository, we make it public

      updateAccess({
        files: selectedFiles,
        public: true,
        fileCountryIso: selectedFiles[0]?.countryIso,
      })

      const linksString = selectedFiles.map(mapFunction).join(' ')
      editor?.s.insertHTML(linksString)
      setEditor(null)
    },
    [setIsOpen, updateAccess, editor?.s, setEditor, assessmentName, cycleName, countryIso]
  )
}
