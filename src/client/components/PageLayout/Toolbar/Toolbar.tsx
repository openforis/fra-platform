import './Toolbar.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Users } from 'meta/user'

import { useCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsGeoRoute, useIsPrintRoute } from 'client/hooks/routes'
import { useShowRegions } from 'client/hooks/showRegions'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'
import LinkHome from 'client/components/LinkHome'
import LinkDataDownload from 'client/components/PageLayout/LinkDataDownload'
import EditorOptions from 'client/components/PageLayout/Toolbar/EditorOptions'
import Options from 'client/components/PageLayout/Toolbar/Options'
import Published from 'client/components/PageLayout/Toolbar/Published'
import { Breakpoints } from 'client/utils/breakpoints'

import LoadingIndicator from './LoadingIndicator'
import ToggleNavigationControl from './ToggleNavigationControl'

const Toolbar: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const { assessmentName, countryIso } = useCountryRouteParams()
  const isFRA = assessmentName === AssessmentNames.fra
  const country = useCountry(countryIso as CountryIso)
  const { print } = useIsPrintRoute()
  const user = useUser()
  const geoRoute = useIsGeoRoute()
  const showRegions = useShowRegions()

  if (print) return null

  const isCountry = Areas.isISOCountry(countryIso)

  const editor = Users.hasEditorRole({ user, countryIso, cycle })

  return (
    <div className="toolbar">
      <div className="toolbar__nav-options">
        <ToggleNavigationControl />

        <AreaSelector
          enableDownload
          includeCountries
          includeRegions={showRegions ? [] : undefined}
          placeholder="common.selectArea"
          selectedValue={countryIso}
          showCountryFlag
          showCountryRole
        />
      </div>

      {geoRoute && (
        <MediaQuery minWidth={Breakpoints.tabletPortrait}>
          <div className="toolbar__geo-beta-message">FRA GEO - Beta version</div>
        </MediaQuery>
      )}

      {isCountry && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          {editor && !geoRoute && <EditorOptions />}
          {country?.props?.deskStudy && <div className="toolbar__desk-study">({t('assessment.deskStudy')})</div>}
          {!user && <Published />}
        </MediaQuery>
      )}

      <MediaQuery minWidth={Breakpoints.laptop}>
        <LoadingIndicator />
      </MediaQuery>

      {!isCountry && isFRA && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <div className="toolbar-options data-link">
            <LinkDataDownload />
          </div>
        </MediaQuery>
      )}
      {isCountry && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <Options />
        </MediaQuery>
      )}

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <LinkHome />
      </MediaQuery>
    </div>
  )
}

export default Toolbar
