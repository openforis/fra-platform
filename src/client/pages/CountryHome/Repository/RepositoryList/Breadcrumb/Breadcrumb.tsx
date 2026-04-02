import './Breadcrumb.scss'
import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

type Props = {
  folderPath: Array<RepositoryItemTree>
  onNavigate: (index: number) => void
}

const Breadcrumb: React.FC<Props> = (props) => {
  const { folderPath, onNavigate } = props

  if (Objects.isEmpty(folderPath)) return null

  return (
    <div className="repository-list__breadcrumb">
      <button onClick={() => onNavigate(-1)}>…</button>
      {folderPath.map((folder, i) => (
        <React.Fragment key={folder.uuid}>
          {' / '}
          <button onClick={() => onNavigate(i)}>{folder.folderName}</button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumb
