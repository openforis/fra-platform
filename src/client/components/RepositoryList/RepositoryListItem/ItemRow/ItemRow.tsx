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
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'

import { useRepositoryListContext } from '../../context'
import RepositoryLink from '../RepositoryLink'

export type Props = {
  depth: number
  item: RepositoryItemTree
}

const ItemRow: React.FC<Props> = (props) => {
  const { depth, item } = props

  const { t } = useTranslation()
  const { onOpenPanel, onSelect, selectable, selectedUuids } = useRepositoryListContext()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem: item })
  const canEdit = isGlobalRepositoryItem ? isGlobalRepositoryEditable : isCountryRepositoryEditable
  const visibility = item.props?.public ? 'public' : 'private'

  let actionCell: React.ReactNode = <div />
  if (selectable) {
    actionCell = (
      <ButtonCheckBox
        checked={selectedUuids.includes(item.uuid)}
        onClick={() => onSelect(item)}
        variant={ButtonCheckboxVariant.checkbox}
      />
    )
  } else if (onOpenPanel && canEdit) {
    actionCell = (
      <Button
        dataTooltipContent={t('description.edit')}
        dataTooltipId={TooltipId.info}
        dataTooltipPlace="left"
        iconName="pencil"
        onClick={() => onOpenPanel(item)}
        size={ButtonSize.xs}
        type={ButtonType.transparent}
      />
    )
  }

  return (
    <div className="repository-list-item">
      <div className="repository-list-item__name" style={{ paddingLeft: depth * 20 + 20 }}>
        <RepositoryLink datum={item} />
      </div>
      <div className="repository-list-item__created-at">{Dates.getRelativeDate(item.createdAt, t)}</div>
      {!selectable && (
        <div className="repository-list-item__icon-wrapper">
          {item.linked && <Icon className="repository-list-item__icon" name="checkbox" />}
        </div>
      )}
      {!selectable && (
        <div className={classNames('repository-list-item__badge', visibility)}>{t(`common.${visibility}`)}</div>
      )}
      {actionCell}
    </div>
  )
}

export default ItemRow
