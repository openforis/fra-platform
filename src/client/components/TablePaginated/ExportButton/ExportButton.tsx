import './ExportButton.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { useExportUrl } from './hooks/useExportUrl'

type Props = {
  path: string
}

const ExportButton: React.FC<Props> = (props) => {
  const { path } = props

  const exportUrl = useExportUrl({ path })

  const className = useButtonClassName({ iconName: 'hit-down' })
  return (
    <div className="table-paginated-export-button">
      <Link className={className} target="_blank" to={exportUrl}>
        <Icon className="icon-sub icon-white" name="hit-down" />
        CSV
      </Link>
    </div>
  )
}

export default ExportButton
