import './ItemRow.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { TooltipId } from 'meta/tooltip/id'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'

import { useRepositoryListContext } from '../../context'
import RepositoryLink from '../RepositoryLink'
import { useLinkedTooltip } from './hooks/useLinkedTooltip'

export type Props = {
  depth: number
  item: RepositoryItemTree
}

const ItemRow: React.FC<Props> = (props) => {
  const { depth, item } = props

  const { t } = useTranslation()
  const { allowEditing, onOpenPanel, onSelect, selectable, selectedUuids, showColumns } = useRepositoryListContext()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()

  const linkedTooltip = useLinkedTooltip(item.usages)

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem: item })
  const canEdit = isGlobalRepositoryItem ? isGlobalRepositoryEditable : isCountryRepositoryEditable
  const visibility = item.props?.public ? 'public' : 'private'

  let actionCell: React.ReactNode = allowEditing ? <div /> : null
  if (selectable) {
    actionCell = (
      <ButtonCheckBox
        checked={selectedUuids.includes(item.uuid)}
        onClick={() => onSelect(item)}
        variant={ButtonCheckboxVariant.checkbox}
      />
    )
  } else if (allowEditing && onOpenPanel && canEdit) {
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
      {showColumns && (
        <div className="repository-list-item__created-at">{Dates.getRelativeDate(item.createdAt, t)}</div>
      )}
      {showColumns && !selectable && (
        <div
          className="repository-list-item__icon-wrapper"
          data-tooltip-content={linkedTooltip ?? undefined}
          data-tooltip-id={linkedTooltip ? TooltipId.info : undefined}
        >
          {!Objects.isEmpty(item.usages) && <Icon className="repository-list-item__icon" name="checkbox" />}
        </div>
      )}
      {showColumns && !selectable && (
        <div className={classNames('repository-list-item__badge', visibility)}>{t(`common.${visibility}`)}</div>
      )}
      {actionCell}
    </div>
  )
}

export default ItemRow
