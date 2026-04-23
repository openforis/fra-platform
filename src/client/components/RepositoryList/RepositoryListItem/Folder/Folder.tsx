import './Folder.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { RepositoryItems } from 'meta/cycleData/repository/items'
import { TooltipId } from 'meta/tooltip/id'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { useRepositoryListContext } from '../../context'
import { Props } from './props'

const Folder: React.FC<Props> = (props) => {
  const { depth, isCollapsed, item } = props
  const { onNavigate, onOpenPanel, onToggle, readOnly, selectable } = useRepositoryListContext()
  const { t } = useTranslation()

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem: item })
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const canEdit = isGlobalRepositoryItem ? isGlobalRepositoryEditable : isCountryRepositoryEditable
  const withActions = !selectable && !readOnly && onOpenPanel && canEdit

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
      {withActions && (
        <Button
          dataTooltipContent={t('description.edit')}
          dataTooltipId={TooltipId.info}
          dataTooltipPlace="left"
          iconName="pencil"
          onClick={() => onOpenPanel(item)}
          size={ButtonSize.xs}
          type={ButtonType.transparent}
        />
      )}
    </div>
  )
}

export default Folder
