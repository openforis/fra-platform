import React from 'react'

import bustString from '../Icon/cacheBust'

type Props = {
  name: string
  className?: string
}

const GeoIcon: React.FC<Props> = ({ name, className }) => {
  const svgClass = className ? `icon-geo ${className}` : 'icon-geo'

  return <img alt="" className={svgClass} src={`/img/geo/${name}.svg?bust=${bustString}#${name}`} />
}

GeoIcon.defaultProps = {
  className: null,
}

export default GeoIcon
