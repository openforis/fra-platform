import './ButtonExpandCollapse.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip/id'

import Icon from 'client/components/Icon'
import { useRepositoryListContext } from 'client/components/RepositoryList/context'

const ButtonExpandCollapse: React.FC = () => {
  const { allExpanded, hasFolders, onCollapseAll, onExpandAll } = useRepositoryListContext()
  const { t } = useTranslation()

  if (!hasFolders) return null

  if (allExpanded) {
    return (
      <button
        className="repository-button-expand-collapse"
        data-tooltip-content={t('common.collapseAll')}
        data-tooltip-id={TooltipId.info}
        onClick={onCollapseAll}
      >
        <Icon name="chevrons-in" />
      </button>
    )
  }

  return (
    <button
      className="repository-button-expand-collapse"
      data-tooltip-content={t('common.expandAll')}
      data-tooltip-id={TooltipId.info}
      onClick={onExpandAll}
    >
      <Icon name="chevrons-out" />
    </button>
  )
}

export default ButtonExpandCollapse
