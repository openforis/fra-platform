import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Icon from '@webapp/components/icon';
const NewVersionButton = () => {
  const { url } = useRouteMatch();
  return <Link to={`${url}new/`}>
    <Icon title="foo" className="icon-new-version" name="circle-add" />
  </Link>;
};

export default NewVersionButton
