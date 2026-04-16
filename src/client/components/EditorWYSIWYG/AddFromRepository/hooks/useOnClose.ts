import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Translations } from 'meta/translation/translations'

import { useUpdateRepositoryItemsAccess } from 'client/store/repository/hooks/useUpdateRepositoryItemAccess'
import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'

type Returned = () => void

export const useOnClose = (): Returned => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { jodit, selectedFiles, setRepositoryOpened } = useRepositoryLinkContext()
  const updateRepositoryAccess = useUpdateRepositoryItemsAccess()

  return useCallback<Returned>(() => {
    setRepositoryOpened(false)
    if (!selectedFiles.length) return

    if (selectedFiles.some((f) => !f.props.public)) {
      const confirmed = window.confirm(t('nationalDataPoint.fileAddedWillBecomePublic'))
      if (!confirmed) return
    }

    const mapFunction = (repositoryItem: RepositoryItem): string => {
      const url = RepositoryItems.getURL({ repositoryItem, assessmentName, cycleName, countryIso })
      return `<a href="${url}" target="_blank">${Translations.getLabel({
        translation: repositoryItem.props.translation,
        language,
      })}</a>`
    }

    updateRepositoryAccess({ repositoryItems: selectedFiles, value: true })

    const linksString = selectedFiles.map(mapFunction).join(' ')
    jodit?.s.insertHTML(linksString)
    // setJodit(null)
  }, [
    assessmentName,
    countryIso,
    cycleName,
    jodit?.s,
    language,
    selectedFiles,
    setRepositoryOpened,
    t,
    updateRepositoryAccess,
  ])
}
