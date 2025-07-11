import './Options.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Hr from 'client/components/Hr'
import SlidingPanel from 'client/components/SlidingPanel'
import AxisSelection from 'client/pages/Explorer/Filters/Options/AxisSelection/AxisSelection'
import { useHideGrid } from 'client/pages/Explorer/hooks/useHideGrid'

import { useMeasuresUnitSelectors } from './hooks/useMeasuresUnitSelectors'
import { useToggleAxis } from './hooks/useToggleAxis'
import UnitsSelection from './UnitsSelection/UnitsSelection'

const Options: React.FC = () => {
  const { t } = useTranslation()
  const [opened, setOpened] = useState(false)

  const { applyAxisSelection, axisSelection, resetAxisSelection, toggleAxis } = useToggleAxis()
  const { applyUnitSelection, resetUnitSelection, unitSelectors } = useMeasuresUnitSelectors()

  const hideGrid = useHideGrid()

  const openPanel = useCallback(() => setOpened(true), [setOpened])

  const closePanel = useCallback(() => setOpened(false), [setOpened])

  const handleCancel = useCallback(() => {
    resetUnitSelection()
    resetAxisSelection()
    closePanel()
  }, [closePanel, resetAxisSelection, resetUnitSelection])

  const handleApply = useCallback(() => {
    applyUnitSelection()
    applyAxisSelection()
    closePanel()
  }, [applyAxisSelection, applyUnitSelection, closePanel])

  return (
    <div className="options-container">
      <Button disabled={hideGrid} iconName="hit-up" onClick={openPanel} />
      <SlidingPanel closePanel={closePanel} opened={opened} size={45}>
        <UnitsSelection unitSelectors={unitSelectors} />

        <AxisSelection axisSelection={axisSelection} toggleAxis={toggleAxis} />

        <Hr className="options-hr" />

        <div className="options-actions">
          <Button iconName="undo" inverse label={t('common.cancel')} onClick={handleCancel} size={ButtonSize.m} />
          <Button
            iconName="checkbox"
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
