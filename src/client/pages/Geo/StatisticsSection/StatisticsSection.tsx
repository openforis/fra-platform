import './StatisticsSection.scss'
import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'

type Props = {
  children: ReactElement
  titleKey: string
}

const StatisticsSection: React.FC<Props> = (props: Props) => {
  const { children, titleKey } = props

  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const handleCollapseButtonClick = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <>
      <div className="geo-statistics-section__container">
        <div className="geo-statistics-section__title-container">
          <p className="geo-statistics-section__title">{t(titleKey)}</p>

          <button className="geo-statistics-section__collapse-button" onClick={handleCollapseButtonClick} type="button">
            <Icon name={open ? 'small-up' : 'small-down'} />
          </button>
        </div>

        {open && <div className="geo-statistics-section__content-container">{children}</div>}
      </div>
      <div className="geo-statistics-section__separator" />
    </>
  )
}

export default StatisticsSection
