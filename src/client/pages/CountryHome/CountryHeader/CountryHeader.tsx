import './CountryHeader.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { MessageTopicType, Topics } from 'meta/messageCenter'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import MessageButton from 'client/pages/CountryHome/MessageButton'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

import { useShowCountryMessageButton } from './hooks/useShowCountryMessageButton'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'
import SelectedCountries from './SelectedCountries'

type Props = {
  sections: Array<CountryHomeSection>
  showRegionLabel?: boolean
}

const size = ButtonSize.m
const noBorder = true

const CountryHeader: React.FC<Props> = (props) => {
  const { sections, showRegionLabel } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const withMessageBoard = useShowCountryMessageButton()
  const sectionClassName = useButtonClassName({ inverse: true, label: 'L', noBorder, size, type: ButtonType.black })
  const sectionActiveClassName = useButtonClassName({ label: 'L', noBorder, size, type: ButtonType.primary })

  const withLabel = useMemo<boolean>(
    () => Areas.isISOCountry(countryIso) || showRegionLabel,
    [countryIso, showRegionLabel]
  )

  const withTabs = useMemo<boolean>(
    () => !Objects.isEmpty(sections) && Areas.isISOCountry(countryIso),
    [countryIso, sections]
  )

  return (
    <div className={classNames('country-header', { withMessageBoard, withTabs })}>
      {withLabel && (
        <div className="country-header__label">
          <h1 className="title">{t(`area.${countryIso}.listName`)}</h1>
          <ButtonDownloadDashboard />
          {Areas.isISOGlobal(countryIso) && <CountrySelector />}
        </div>
      )}

      {Areas.isISOGlobal(countryIso) && <SelectedCountries />}

      {withTabs && (
        <div className="country-header__tabs">
          {sections.map(({ name }, index) => (
            <React.Fragment key={name}>
              {index !== 0 && <div className="toolbar__separator" />}
              <NavLink
                key={name}
                className={({ isActive }) => (isActive ? sectionActiveClassName : sectionClassName)}
                to={name}
              >
                {t(`landing.sections.${name}`)}
              </NavLink>
            </React.Fragment>
          ))}
        </div>
      )}

      {withMessageBoard && (
        <MessageButton
          inverse
          label={t('landing.sections.messageBoard')}
          size={ButtonSize.m}
          topic={{
            key: Topics.getMessageBoardCountryKey(),
            title: t(Areas.getTranslationKey(countryIso)),
            type: MessageTopicType.messageBoard,
          }}
        />
      )}
    </div>
  )
}

CountryHeader.defaultProps = {
  showRegionLabel: true,
}

export default CountryHeader
