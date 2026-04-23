import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useRepositoryListContext } from '../../context'

type Props = {
  isFolder?: boolean
  parentUuid?: string
}

const _getNewRepositoryItem = (props: {
  countryIso: CountryIso | undefined
  isFolder: boolean
  parentUuid: string | undefined
}): Partial<RepositoryItemTree> => {
  const { countryIso, isFolder, parentUuid } = props
  if (isFolder) return { countryIso, folderName: '', parentUuid }
  return { countryIso, parentUuid, props: { public: true, translation: { en: '' } } }
}

const ButtonAdd: React.FC<Props> = (props) => {
  const { isFolder, parentUuid } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { isGlobal, onOpenPanel } = useRepositoryListContext()
  const { t } = useTranslation()

  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()

  if (!onOpenPanel) return null
  if (isGlobal && !isGlobalRepositoryEditable) return null
  if (!isGlobal && !isCountryRepositoryEditable) return null

  const label = isFolder ? t('common.addFolder') : t('common.addFile')
  const itemCountryIso = isGlobal ? undefined : countryIso

  return (
    <Button
      iconName="small-add"
      inverse
      label={label}
      onClick={() => onOpenPanel(_getNewRepositoryItem({ countryIso: itemCountryIso, isFolder, parentUuid }))}
      size={ButtonSize.xs}
    />
  )
}

export default ButtonAdd
