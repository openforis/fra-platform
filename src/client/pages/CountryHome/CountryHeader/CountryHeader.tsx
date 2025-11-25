import './CountryHeader.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import { Areas } from 'meta/area/areas'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import MessageButton from 'client/pages/CountryHome/MessageButton'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

import { useShowCountryMessageButton } from './hooks/useShowCountryMessageButton'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'

type Props = {
  sections: Array<CountryHomeSection>
  showRegionLabel?: boolean
}

const size = ButtonSize.m
const noBorder = true

const CountryHeader: React.FC<Props> = (props) => {
  const { sections, showRegionLabel = true } = props

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
    () => Areas.isISOCountry(countryIso) && sections?.length > 1,
    [countryIso, sections]
  )

  return (
    <div className="country-header">
      {withLabel && (
        <div className="country-header__label">
          <div className="country-header__title">
            <h2 className="title">{t(`area.${countryIso}.listName`)}</h2>
            <ButtonDownloadDashboard />
          </div>
          <CountrySelector />
          {withMessageBoard && (
            <MessageButton
              inverse
              label={t('landing.sections.messageBoard')}
              size={ButtonSize.s}
              topic={{
                key: Topics.getMessageBoardCountryKey(),
                title: t(Areas.getTranslationKey(countryIso)),
                type: MessageTopicType.messageBoard,
              }}
            />
          )}
        </div>
      )}

      {withTabs && (
        <div className="country-header__tabs">
          {sections.map(({ name }, index) => (
            <React.Fragment key={name}>
              {index !== 0 && <div className="toolbar__separator" />}
              <NavLink
                key={name}
                className={({ isActive }): string => (isActive ? sectionActiveClassName : sectionClassName)}
                to={`../${name}`}
              >
                {t(`landing.sections.${name}`)}
              </NavLink>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default CountryHeader
