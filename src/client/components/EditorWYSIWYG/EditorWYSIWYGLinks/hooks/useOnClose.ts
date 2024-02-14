import { Dispatch, SetStateAction, useCallback } from 'react'

import type { Jodit } from 'jodit-react'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'
import { RepositoryItems } from 'meta/cycleData/repository/repositoryItems'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  editor: Jodit
  setEditor: Dispatch<SetStateAction<Jodit>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

type Returned = (files: Array<RepositoryItem>) => void

export const useOnClose = (props: Props): Returned => {
  const { setIsOpen, setEditor, editor } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  // const updateAccess = useUpdateAccess()

  return useCallback<Returned>(
    (repositoryItems: Array<RepositoryItem>) => {
      setIsOpen(false)
      if (!repositoryItems.length) return

      const mapFunction = (repositoryItem: RepositoryItem) => {
        const url = RepositoryItems.getURL({ repositoryItem, assessmentName, cycleName, countryIso })
        return `<a href="${url}" target="_blank">${repositoryItem.name}</a>`
      }

      // When adding a file from file repository, we make it public
      // const fileCountryIso = files[0]?.countryIso
      // updateAccess({ fileCountryIso, files, public: true })
      // TODO:
      // On drop:
      // Upload the file to the server
      // Create new repository item with { props: { public: true } }

      const linksString = repositoryItems.map(mapFunction).join(' ')
      editor?.s.insertHTML(linksString)
      setEditor(null)
    },
    [setIsOpen, editor?.s, setEditor, assessmentName, cycleName, countryIso]
  )
}
