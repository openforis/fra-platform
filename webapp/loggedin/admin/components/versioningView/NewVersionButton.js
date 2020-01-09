import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Icon from '@webapp/components/icon';
export const NewVersionButton = () => {
  const { url } = useRouteMatch();
  return <Link to={`${url}new/`}>
    <Icon title="foo" className="icon-new-version icon-red" name="circle-add" />
  </Link>;
};
