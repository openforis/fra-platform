import { Dispatch, SetStateAction, useCallback } from 'react'

import type { Jodit } from 'jodit-react'

import { CountryIso } from 'meta/area'
import { RepositoryItem, RepositoryItems } from 'meta/cycleData'

import { useUpdateRepositoryItemsAccess } from 'client/store/ui/repository'
import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  editor: Jodit
  setEditor: Dispatch<SetStateAction<Jodit>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

type Returned = (files: Array<RepositoryItem>) => void

export const useOnClose = (props: Props): Returned => {
  const { setIsOpen, setEditor, editor } = props
  const language = useLanguage()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const updateRepositoryAccess = useUpdateRepositoryItemsAccess()

  return useCallback<Returned>(
    (repositoryItems: Array<RepositoryItem>) => {
      setIsOpen(false)
      if (!repositoryItems.length) return

      const mapFunction = (repositoryItem: RepositoryItem) => {
        const url = RepositoryItems.getURL({ repositoryItem, assessmentName, cycleName, countryIso })
        return `<a href="${url}" target="_blank">${RepositoryItems.getName({ repositoryItem, language })}</a>`
      }

      repositoryItems.forEach((_repositoryItem: RepositoryItem) => {
        updateRepositoryAccess({ repositoryItems, value: true })
      })

      const linksString = repositoryItems.map(mapFunction).join(' ')
      editor?.s.insertHTML(linksString)
      setEditor(null)
    },
    [setIsOpen, editor?.s, setEditor, assessmentName, cycleName, countryIso, language, updateRepositoryAccess]
  )
}
