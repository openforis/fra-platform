import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  isAdmin?: boolean
}

const ButtonAdd: React.FC<Props> = (props: Props) => {
  const { isAdmin } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const openPanel = useOpenPanel({ countryIso: isAdmin ? undefined : countryIso })

  return <Button iconName="small-add" label={t('common.add')} onClick={openPanel} size={ButtonSize.m} />
}

ButtonAdd.defaultProps = {
  isAdmin: false,
}

export default ButtonAdd
