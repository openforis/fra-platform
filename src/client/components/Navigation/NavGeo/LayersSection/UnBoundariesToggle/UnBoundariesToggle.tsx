import './UnBoundariesToggle.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BoundariesActions } from 'client/store/geo/boundaries/actions'
import { useShowUnBoundaries, useUnBoundariesStatus } from 'client/store/geo/boundaries/hooks/boundaries'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { useAppDispatch } from 'client/store/hooks'
import { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'

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
      <ButtonCheckbox
        checked={showUnBoundaries}
        className="checkbox"
        label={t('geo.showUnBoundaries')}
        loading={status === LayerFetchStatus.Loading}
        onClick={toggle}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
    </div>
  )
}

export default UnBoundariesToggle
