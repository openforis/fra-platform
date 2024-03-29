import './Toolbar.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { Areas, CountryIso } from 'meta/area'
import { Users } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsGeoRoute, useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'
import LinkHome from 'client/components/LinkHome'
import EditorOptions from 'client/components/PageLayout/Toolbar/EditorOptions'
import Options from 'client/components/PageLayout/Toolbar/Options'
import { Breakpoints } from 'client/utils'

import ToggleNavigationControl from './ToggleNavigationControl'

const Toolbar: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams()
  const country = useCountry(countryIso as CountryIso)
  const { print } = useIsPrintRoute()
  const user = useUser()
  const geoRoute = useIsGeoRoute()
  const isAReviewer = useMemo<boolean>(() => Users.isAReviewer(user, cycle), [user, cycle])

  if (print) return null

  const isCountry = Areas.isISOCountry(countryIso)
  const isAdmin = Users.isAdministrator(user)
  const includeGlobals = isAdmin || cycle.published || isAReviewer
  const includeRegions = isAdmin || cycle.published
  const editor = Users.hasEditorRole({ user, countryIso, cycle })

  return (
    <div className="toolbar">
      <div className="toolbar__nav-options">
        <ToggleNavigationControl />

        <AreaSelector
          enableDownload
          includeCountries
          includeGlobals={includeGlobals}
          includeRegions={includeRegions}
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
