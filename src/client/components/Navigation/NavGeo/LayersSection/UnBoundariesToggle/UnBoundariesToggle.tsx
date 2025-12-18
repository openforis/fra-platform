import './UnBoundariesToggle.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BoundariesActions } from 'client/store/geo/boundaries/actions'
import { useShowUnBoundaries, useUnBoundariesStatus } from 'client/store/geo/boundaries/hooks/boundaries'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { useAppDispatch } from 'client/store/hooks'
import ToggleControl from 'client/components/Navigation/NavGeo/Layer/ToggleControl'

const UnBoundariesToggle: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const showUnBoundaries = useShowUnBoundaries()
  const status = useUnBoundariesStatus()

  const toggle = useCallback<() => void>(() => {
    dispatch(BoundariesActions.setShowUnBoundaries({ show: !showUnBoundaries }))
  }, [dispatch, showUnBoundaries])

  return (
    <div className="nav-geo__un-boundaries-toggle">
      <ToggleControl
        backgroundColor="#5B92E5"
        checked={showUnBoundaries}
        label={t('geo.showUnBoundaries')}
        onCheckboxClick={toggle}
        status={showUnBoundaries ? status : LayerFetchStatus.Unfetched}
      />
    </div>
  )
}

export default UnBoundariesToggle
