import './PanEuropeanHome.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { Areas } from 'meta/area'
import { MessageTopicType, Topics } from 'meta/messageCenter'
import { SectionNames } from 'meta/routes'

import { useUser } from 'client/store/user'
import { useCanSeeUserActivities } from 'client/hooks/useCanSeeUserActivities'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import MessageButton from 'client/components/MessageButton'
import ButtonDownloadDashboard from 'client/pages/CountryHome/FraHome/ButtonDownloadDashboard'

import { useSections } from './hooks/useSections'

const PanEuropeanHome: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const sections = useSections()
  const user = useUser()
  const canSeeUserActivities = useCanSeeUserActivities(user)

  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {t(`area.${countryIso}.listName`)}
          <ButtonDownloadDashboard />
        </h1>
        {canSeeUserActivities && (
          <MessageButton
            label={t('landing.users.message')}
            topicKey={Topics.getMessageBoardCountryKey()}
            topicTitle={t(Areas.getTranslationKey(countryIso))}
            topicType={MessageTopicType.messageBoard}
          />
        )}
      </div>
      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name }) => (
            <NavLink
              key={name}
              className={(navData) =>
                classNames('btn landing__page-menu-button', {
                  disabled: navData.isActive,
                })
              }
              to={name}
            >
              {t(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} element={React.createElement(component, {})} path={`${name}/*`} />
        ))}

        <Route element={<Navigate replace to={SectionNames.Country.Home.overview} />} index />
      </Routes>
    </>
  )
}
export default PanEuropeanHome
