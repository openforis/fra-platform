import './CountryHeader.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { DataTestId } from 'meta/dataTestId/id'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize } from 'client/components/Buttons/Button'
import Tabs from 'client/components/Tabs'
import { TabItem } from 'client/components/Tabs/types'
import MessageButton from 'client/pages/CountryHome/MessageButton'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

import { useShowCountryMessageButton } from './hooks/useShowCountryMessageButton'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'

type Props = {
  sections: Array<CountryHomeSection>
  showRegionLabel?: boolean
}

const CountryHeader: React.FC<Props> = (props) => {
  const { sections, showRegionLabel = true } = props

  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const withMessageBoard = useShowCountryMessageButton()

  const withLabel = useMemo<boolean>(
    () => Areas.isISOCountry(countryIso) || showRegionLabel,
    [countryIso, showRegionLabel]
  )

  const withTabs = useMemo<boolean>(
    () => Areas.isISOCountry(countryIso) && sections?.length > 1,
    [countryIso, sections]
  )

  const tabItems = useMemo<Array<TabItem>>(
    () =>
      sections.map<TabItem>(({ route }) => ({
        href: route.generatePath({ assessmentName, countryIso, cycleName }),
        label: t(`landing.sections.${route.path.relative}`),
      })),
    [assessmentName, countryIso, cycleName, sections, t]
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

      {withTabs && <Tabs dataTestId={DataTestId.countryHomeTabs} items={tabItems} />}
    </div>
  )
}

export default CountryHeader
