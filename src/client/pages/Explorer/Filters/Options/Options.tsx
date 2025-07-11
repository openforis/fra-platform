import './Options.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Hr from 'client/components/Hr'
import SlidingPanel from 'client/components/SlidingPanel'
import AxisSelection from 'client/pages/Explorer/Filters/Options/AxisSelection/AxisSelection'

import { useToggleAxis } from './hooks/useToggleAxis'

const Options: React.FC = () => {
  const { t } = useTranslation()
  const [opened, setOpened] = useState(false)

  const { applyAxisSelection, axisSelection, resetAxisSelection, toggleAxis } = useToggleAxis()

  const openPanel = () => setOpened(true)
  const closePanel = () => setOpened(false)

  const handleCancel = () => {
    resetAxisSelection()
    closePanel()
  }

  const handleApply = () => {
    applyAxisSelection()
    closePanel()
  }

  return (
    <div>
      <Button iconName="hit-up" onClick={openPanel} />
      <SlidingPanel closePanel={closePanel} opened={opened} size={45}>
        <AxisSelection axisSelection={axisSelection} toggleAxis={toggleAxis} />

        <Hr className="options-hr" />

        <div className="options-actions">
          <Button iconName="undo" inverse label={t('common.cancel')} onClick={handleCancel} size={ButtonSize.m} />
          <Button
            iconName="hit-up"
            label={t('common.apply')}
            onClick={handleApply}
            size={ButtonSize.m}
            type={ButtonType.primary}
          />
        </div>
      </SlidingPanel>
    </div>
  )
}

export default Options
