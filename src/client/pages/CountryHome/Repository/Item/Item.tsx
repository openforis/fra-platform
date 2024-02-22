import 'client/pages/CountryHome/Repository/Item/Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { RepositoryItem } from 'meta/cycleData'

import RepositoryLink from 'client/pages/CountryHome/Repository/RepositoryLink'

type Props = {
  repositoryItem: RepositoryItem
}

const Item: React.FC<Props> = (props) => {
  const { repositoryItem } = props

  const { t } = useTranslation()

  const level = repositoryItem.props.public ? 'public' : 'private'

  return (
    <div className="repository-item">
      <RepositoryLink datum={repositoryItem} />
      <div className={classNames('repository-item__badge', level)}>{t(`common.${level}`)}</div>
    </div>
  )
}

export default Item
