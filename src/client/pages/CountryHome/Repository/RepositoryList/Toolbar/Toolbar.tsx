import './Toolbar.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'

const Toolbar: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="repository-toolbar">
      <div className="repository-toolbar__col repository-toolbar__col--name">
        {t('common.name')}
        <Icon name="small-down" />
      </div>
      <div className="repository-toolbar__col">{t('common.added')}</div>
      <div className="repository-toolbar__col">{t('common.linked')}</div>
      <div className="repository-toolbar__col">{t('common.access')}</div>
      <div />
    </div>
  )
}

export default Toolbar
