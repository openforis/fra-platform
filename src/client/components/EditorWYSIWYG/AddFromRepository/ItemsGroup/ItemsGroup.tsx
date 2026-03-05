import './ItemsGroup.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Assessments } from 'meta/assessment/assessments'
import { CycleUuid } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import FileRow from './FileRow'

type Props = {
  cycleUuid: CycleUuid
  items: Array<RepositoryItem>
  isChecked: (uuid: string) => boolean
  onClick: (uuid: string) => void
}

const ItemsGroup: React.FC<Props> = (props) => {
  const { cycleUuid, isChecked, items, onClick } = props

  const { t } = useTranslation()
  const assessment = useAssessment()
  const currentCycle = useCycle()

  // RepositoryItem cycle
  const cycle = Assessments.getCycle({ assessment, cycleUuid })
  const labelCycle = t(Assessments.getCycleTranslationKey({ cycleName: cycle.name }))
  const label = `${labelCycle} (${items.length})`

  const [collapsed, setCollapsed] = useState<boolean>(cycleUuid !== currentCycle?.uuid)
  const toggleView = (): void => setCollapsed(!collapsed)

  return (
    <div>
      <Button
        className={classNames('items-group__header', { collapsed })}
        iconName="small-down"
        inverse
        label={label}
        onClick={toggleView}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
      {!collapsed && (
        <div className="items-group__rows">
          {items.map((repositoryItem) => (
            <FileRow
              key={repositoryItem.uuid}
              isChecked={isChecked}
              onClick={onClick}
              repositoryItem={repositoryItem}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemsGroup
