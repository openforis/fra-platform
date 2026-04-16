import './Folder.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { RepositoryItems } from 'meta/cycleData/repository/items'
import { TooltipId } from 'meta/tooltip/id'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'

import { useRepositoryListContext } from '../../context'
import { Props } from './props'

const Folder: React.FC<Props> = (props) => {
  const { depth, isCollapsed, item } = props
  const { onNavigate, onOpenPanel, onSelectFolder, onToggle, selectable, selectedUuids } = useRepositoryListContext()
  const { t } = useTranslation()

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem: item })
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const canEdit = isGlobalRepositoryItem ? isGlobalRepositoryEditable : isCountryRepositoryEditable
  const withActions = onOpenPanel && canEdit

  const folderFileItems = selectable ? RepositoryItems.getFileItemsFromFolder(item) : []
  const allSelected = folderFileItems.length > 0 && folderFileItems.every((f) => selectedUuids.includes(f.uuid))

  return (
    <div className="repository-list-item repository-list-item--folder">
      <div className={classNames('repository-folder', { expanded: !isCollapsed })} style={{ paddingLeft: depth * 20 }}>
        <button onClick={() => onToggle(item.uuid)}>
          <Icon name="small-down" />
        </button>
        <button onClick={() => onNavigate(item.uuid)}>
          <Icon name="icon-folder" />
          {item.folderName}
        </button>
      </div>
      {selectable ? (
        <ButtonCheckBox
          checked={allSelected}
          onClick={() => onSelectFolder(folderFileItems, !allSelected)}
          variant={ButtonCheckboxVariant.checkbox}
        />
      ) : (
        withActions && (
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
      )}
    </div>
  )
}

export default Folder
