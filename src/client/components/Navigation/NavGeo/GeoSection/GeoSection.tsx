import './GeoSection.scss'
import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import Hr from 'client/components/Hr'

type Props = {
  children: ReactElement
  labelKey: string
}

const GeoSection: React.FC<Props> = (props) => {
  const { children, labelKey } = props

  const { t } = useTranslation()
  const label = t(labelKey)

  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div className={classNames('nav-geo-section', { expanded })}>
        <div className="nav-geo-section__header">
          <Button inverse={!expanded} label={label} onClick={() => setExpanded(!expanded)} size={ButtonSize.m} />
        </div>
        <div
          className={classNames(`nav-geo-section__content`, {
            hidden: !expanded,
            visible: expanded,
          })}
        >
          {expanded && children}
        </div>
      </div>
      {expanded && <Hr />}
    </>
  )
}

export default GeoSection
