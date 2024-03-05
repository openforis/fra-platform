import 'client/pages/CountryHome/Repository/Item/Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { RepositoryItem, RepositoryItems } from 'meta/cycleData'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user'
import Actions from 'client/pages/CountryHome/Repository/Actions'
import RepositoryLink from 'client/pages/CountryHome/Repository/RepositoryLink'

type Props = {
  repositoryItem: RepositoryItem
}

const Item: React.FC<Props> = (props) => {
  const { repositoryItem } = props

  const { t } = useTranslation()
  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem })
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const withActions = (isGlobalRepositoryItem && isGlobalRepositoryEditable) || isCountryRepositoryEditable

  const level = repositoryItem.props.public ? 'public' : 'private'

  return (
    <div className={classNames('repository-item', { withActions })}>
      <RepositoryLink datum={repositoryItem} />
      <div className={classNames('repository-item__badge', level)}>{t(`common.${level}`)}</div>
      {withActions && <Actions repositoryItem={repositoryItem} />}
    </div>
  )
}

export default Item
