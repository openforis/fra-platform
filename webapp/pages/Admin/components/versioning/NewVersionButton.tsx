import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Icon from '@webapp/components/icon'

const NewVersionButton = () => {
  const { url } = useRouteMatch()
  return (
    <Link to={`${url}new/`}>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
      <Icon className="icon-new-version" name="circle-add" />
    </Link>
  )
}

export default NewVersionButton
