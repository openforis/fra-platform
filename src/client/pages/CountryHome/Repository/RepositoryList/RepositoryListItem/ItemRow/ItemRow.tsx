import './ItemRow.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { TooltipId } from 'meta/tooltip/id'
import { Dates } from 'utils/dates'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

import RepositoryLink from '../RepositoryLink'

export type Props = {
  depth: number
  item: RepositoryItemTree
}

const ItemRow: React.FC<Props> = (props) => {
  const { depth, item } = props

  const { t } = useTranslation()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const openPanel = useOpenPanel({ repositoryItem: item })

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem: item })
  const withActions = isGlobalRepositoryItem ? isGlobalRepositoryEditable : isCountryRepositoryEditable
  const level = item.props?.public ? 'public' : 'private'

  return (
    <div className="repository-list-item">
      <div style={{ paddingLeft: depth * 20 + 20 }}>
        <RepositoryLink datum={item} />
      </div>
      <div className="repository-list-item__created-at">{Dates.getRelativeDate(item.createdAt, t)}</div>
      <div className="repository-list-item__icon-wrapper">
        {item.linked && <Icon className="repository-list-item__icon" name="checkbox" />}
      </div>
      <div className={classNames('repository-list-item__badge', level)}>{t(`common.${level}`)}</div>
      {withActions ? (
        <Button
          dataTooltipContent={t('common.editItem')}
          dataTooltipId={TooltipId.info}
          dataTooltipPlace="left"
          iconName="pencil"
          onClick={openPanel}
          size={ButtonSize.xs}
          type={ButtonType.transparent}
        />
      ) : (
        <div />
      )}
    </div>
  )
}

export default ItemRow
