import { useCallback } from 'react'

import type { Jodit } from 'jodit/types/jodit'

import { AssessmentFile, AssessmentFiles } from 'meta/cycleData'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnClose = (props: {
  setIsOpen: (isOpen: boolean) => void
  setEditor: (editor: Jodit) => void
  editor: Jodit
}) => {
  const { setIsOpen, setEditor, editor } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  return useCallback(
    (selectedFiles: Array<AssessmentFile>) => {
      setIsOpen(false)
      const mapFunction = (file: AssessmentFile) => {
        const { uuid } = file
        const hrefProps = { assessmentName, cycleName, countryIso, uuid }
        return `<a href="${AssessmentFiles.getHref(hrefProps)}" target="_blank">${file.fileName}</a>`
      }
      const linksString = selectedFiles.map(mapFunction).join(' ')
      editor?.s.insertHTML(linksString)
      setEditor(null)
    },
    [setIsOpen, editor?.s, setEditor, assessmentName, cycleName, countryIso]
  )
}
