import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { RepositoryItem, RepositoryItems } from 'meta/cycleData'
import { Translations } from 'meta/translation'

import { useUpdateRepositoryItemsAccess } from 'client/store/ui/repository'
import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

type Returned = () => void

export const useOnClose = (): Returned => {
  const language = useLanguage()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { jodit, selectedFiles, setRepositoryOpened } = useRepositoryLinkContext()
  const updateRepositoryAccess = useUpdateRepositoryItemsAccess()

  return useCallback<Returned>(() => {
    setRepositoryOpened(false)
    if (!selectedFiles.length) return

    const mapFunction = (repositoryItem: RepositoryItem) => {
      const url = RepositoryItems.getURL({ repositoryItem, assessmentName, cycleName, countryIso })
      return `<a href="${url}" target="_blank">${Translations.getLabel({
        translation: repositoryItem.props.translation,
        language,
      })}</a>`
    }

    selectedFiles.forEach((_repositoryItem: RepositoryItem) => {
      updateRepositoryAccess({ repositoryItems: selectedFiles, value: true })
    })

    const linksString = selectedFiles.map(mapFunction).join(' ')
    jodit?.s.insertHTML(linksString)
    // setJodit(null)
  }, [
    setRepositoryOpened,
    selectedFiles,
    jodit?.s,
    assessmentName,
    cycleName,
    countryIso,
    language,
    updateRepositoryAccess,
  ])
}
