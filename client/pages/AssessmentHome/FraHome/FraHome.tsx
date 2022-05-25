import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// import { Areas } from '@meta/area'
// import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'
// import StatisticalFactsheets from '@client/pages/StatisticalFactsheets'

// import CountrySelector from './CountrySelector'
// import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  // const { pathname } = useLocation()
  const countryIso = useCountryIso()
  // const user = useUser()
  const { i18n } = useTranslation()
  // const sections = useCountryLandingSections()
  // const isCountry = Areas.isISOCountry(countryIso)
  // const overviewPath = BasePaths.getAssessmentHomeSectionLink(countryIso, FRA.type, 'overview')
  // const matchOverview = matchPath(pathname, {
  //   path: [BasePaths.getAssessmentHomeLink(countryIso, FRA.type), overviewPath],
  //   exact: true,
  // })
  // tabs are available when user is logged-in and selected area is country
  // const displayTabs = user && isCountry
  // const fraRegions = useFraRegions()
  const showButton = true // (fraRegions.includes(countryIso as RegionCode) || Areas.isISOGlobal(countryIso)) && matchOverview

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {i18n.t(`area.${countryIso}.listName`)}

          {showButton && (
            <Link
              className="btn-s btn-primary landing__btn-download"
              to={`/api/fileRepository/statisticalFactsheets/${countryIso}/${i18n.language}`}
              target="_top"
            >
              <Icon name="hit-down" className="icon-hit-down icon-white" />
              <Icon name="icon-table2" className="icon-no-margin icon-white" />
            </Link>
          )}
        </h1>

        {/* {Areas.isISOGlobal(countryIso) && <CountrySelector />} */}
      </div>

      {/* {Areas.isISOGlobal(countryIso) && <SelectedCountries />} */}

      {/* {displayTabs && ( */}
      {/*  <div className="landing__page-menu"> */}
      {/*    {sections.map(({ name: section }) => ( */}
      {/*      <NavLink */}
      {/*        key={section} */}
      {/*        to={BasePaths.getAssessmentHomeSectionLink(countryIso, FRA.type, section)} */}
      {/*        className="btn landing__page-menu-button" */}
      {/*        activeClassName="disabled" */}
      {/*      > */}
      {/*        {i18n.t(`landing.sections.${section}`)} */}
      {/*      </NavLink> */}
      {/*    ))} */}
      {/*  </div> */}
      {/* )} */}
      {/* {displayTabs ? ( */}
      {/*  // <Switch> */}
      {/*    /!* <Route exact path={BasePaths.getAssessmentHomeLink(countryIso, FRA.type)}> *!/ */}
      {/*    /!*  <Redirect to={overviewPath} /> *!/ */}
      {/*    /!* </Route> *!/ */}
      {/*    /!* {sections.map(({ name: section, component }: any) => ( *!/ */}
      {/*    /!*  <Route *!/ */}
      {/*    /!*    key={section} *!/ */}
      {/*    /!*    path={BasePaths.getAssessmentHomeSectionLink(':countryIso', FRA.type, section)} *!/ */}
      {/*    /!*    component={component} *!/ */}
      {/*    /!*  /> *!/ */}
      {/*    /!* ))} *!/ */}
      {/*  // </Switch> */}
      {/* // ) : ( */}
      <pre>Statistical Factsheets</pre>
      {/* <StatisticalFactsheets /> */}
      {/* // )} */}
    </>
  )
}
export default FraHome
