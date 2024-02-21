import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  isGlobal?: boolean
}

const ButtonAdd: React.FC<Props> = (props: Props) => {
  const { isGlobal } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const openPanel = useOpenPanel({ countryIso: isGlobal ? undefined : countryIso })

  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()

  if (isGlobal && !isGlobalRepositoryEditable) {
    return null
  }

  if (!isGlobal && !isCountryRepositoryEditable) {
    return null
  }

  return <Button iconName="small-add" label={t('common.add')} onClick={openPanel} size={ButtonSize.m} />
}

ButtonAdd.defaultProps = {
  isGlobal: false,
}

export default ButtonAdd
