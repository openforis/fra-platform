import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

type Props = {
  repositoryItem: RepositoryItemTree
}

const Folder: React.FC<Props> = (props) => {
  const { repositoryItem } = props

  return <div>{repositoryItem.folderName}</div>
}

export default Folder
