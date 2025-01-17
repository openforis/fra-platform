import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { FileSummary } from 'meta/file'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { Props } from 'client/components/FileUpload/Files/props'

export const useOnDelete = (props: Props) => {
  const { value, onChange } = props
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  return useCallback(
    (fileSummary: FileSummary) => {
      dispatch(
        RepositoryActions.removeFile({ assessmentName, cycleName, countryIso, sectionName, uuid: fileSummary.uuid })
      )
      onChange(value.filter((f) => f.uuid !== fileSummary.uuid))
    },
    [assessmentName, countryIso, cycleName, dispatch, onChange, sectionName, value]
  )
}
