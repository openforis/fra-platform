import './GeoSection.scss'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  children: ReactElement
  expanded: boolean
  icon?: React.ReactNode
  labelKey: string
  setExpanded: (expanded: boolean) => void
}

const GeoSection: React.FC<Props> = (props) => {
  const { children, expanded, icon, labelKey, setExpanded } = props

  const { t } = useTranslation()
  const label = t(labelKey)

  return (
    <div className={classNames('nav-geo-section', { expanded })}>
      <div className="nav-geo-section__header">
        <Button
          icon={icon}
          inverse={!expanded}
          label={label}
          onClick={() => setExpanded(!expanded)}
          size={ButtonSize.m}
          type={ButtonType.black}
        />
      </div>
      <div className={classNames(`nav-geo-section__content`, { expanded })}>{expanded && children}</div>
    </div>
  )
}

GeoSection.defaultProps = {
  icon: undefined,
}

export default GeoSection
