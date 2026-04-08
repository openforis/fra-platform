import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  isGlobal?: boolean
  parentUuid?: string
}

const ButtonAdd: React.FC<Props> = (props: Props) => {
  const { isGlobal, parentUuid } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const openPanel = useOpenPanel({ countryIso: isGlobal ? undefined : countryIso, parentUuid })

  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()

  if (isGlobal && !isGlobalRepositoryEditable) {
    return null
  }

  if (!isGlobal && !isCountryRepositoryEditable) {
    return null
  }

  return <Button iconName="small-add" inverse label={t('common.add')} onClick={openPanel} size={ButtonSize.xs} />
}

export default ButtonAdd
