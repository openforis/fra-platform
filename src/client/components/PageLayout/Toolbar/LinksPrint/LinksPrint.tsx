import React from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const LinksPrint: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  return (
    <MediaQuery minWidth={Breakpoints.laptop}>
      {/* <Link */}
      {/*  className="btn btn-secondary" */}
      {/*  to={Routes.PrintTables.generatePath({ countryIso, assessmentName, cycleName })} */}
      {/*  target="_blank" */}
      {/* > */}
      {/*  <Icon name="small-print" className="icon-margin-left icon-sub" /> */}
      {/*  <Icon name="icon-table2" className="icon-no-margin icon-sub" /> */}
      {/* </Link> */}

      <Link
        className="btn btn-secondary"
        target="_blank"
        to={Routes.Print.generatePath({ countryIso, assessmentName, cycleName })}
      >
        <Icon className="icon-no-margin icon-sub" name="small-print" />
      </Link>
    </MediaQuery>
  )
}

export default LinksPrint
