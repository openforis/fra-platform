import React from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

type Props = {
  withSeparator: boolean
}

const LinksPrint: React.FC<Props> = (props) => {
  const { withSeparator } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  if (assessmentName !== AssessmentNames.fra) return null

  return (
    <MediaQuery minWidth={Breakpoints.laptop}>
      {withSeparator && <div className="toolbar__separator" />}

      <Link
        className="btn btn-secondary"
        to={Routes.PrintTables.generatePath({ countryIso, assessmentName, cycleName })}
        target="_blank"
      >
        <Icon name="small-print" className="icon-margin-left icon-sub" />
        <Icon name="icon-table2" className="icon-no-margin icon-sub" />
      </Link>

      <Link
        className="btn btn-secondary"
        to={Routes.Print.generatePath({ countryIso, assessmentName, cycleName })}
        target="_blank"
      >
        <Icon name="small-print" className="icon-no-margin icon-sub" />
      </Link>
    </MediaQuery>
  )
}

export default LinksPrint
