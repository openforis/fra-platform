import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  isAdmin?: boolean
}

const ButtonOpenPanel: React.FC<Props> = (props: Props) => {
  const { isAdmin } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const openPanel = useOpenPanel({ countryIso: isAdmin ? undefined : countryIso })

  return (
    <button className="btn-s btn-primary" onClick={openPanel} type="button">
      <Icon className="icon-sub icon-white" name="small-add" />
      {t('common.add')}
    </button>
  )
}

ButtonOpenPanel.defaultProps = {
  isAdmin: false,
}

export default ButtonOpenPanel
