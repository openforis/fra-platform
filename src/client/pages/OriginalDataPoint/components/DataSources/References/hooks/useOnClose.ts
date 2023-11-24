import { useCallback } from 'react'

import type { Jodit } from 'jodit/types/jodit'

import { CountryIso } from 'meta/area'
import { AssessmentFile, AssessmentFiles } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnClose = (props: {
  setIsOpen: (isOpen: boolean) => void
  setEditor: (editor: Jodit) => void
  editor: Jodit
}) => {
  const dispatch = useAppDispatch()
  const { setIsOpen, setEditor, editor } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    (selectedFiles: Array<AssessmentFile>) => {
      setIsOpen(false)
      const mapFunction = (file: AssessmentFile) => {
        const { uuid } = file
        const hrefProps = { assessmentName, cycleName, countryIso, uuid }
        return `<a href="${AssessmentFiles.getHref(hrefProps)}" target="_blank">${file.fileName}</a>`
      }
      // When adding a file from file repository, we make it public
      dispatch(
        AssessmentFilesActions.updatePublic({
          assessmentName,
          cycleName,
          countryIso,
          files: selectedFiles,
          public: true,
        })
      )
      const linksString = selectedFiles.map(mapFunction).join(' ')
      editor?.s.insertHTML(linksString)
      setEditor(null)
    },
    [setIsOpen, dispatch, assessmentName, cycleName, countryIso, editor?.s, setEditor]
  )
}
