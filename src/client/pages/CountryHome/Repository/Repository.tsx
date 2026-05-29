import './Repository.scss'
import React from 'react'

import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import RepositoryList from 'client/components/RepositoryList'

const Repository: React.FC = () => {
  const isPanEuropean = useIsPanEuropeanRoute()

  return (
    <div className="repository">
      {!isPanEuropean && (
        <>
          <RepositoryList
            allowEditing={false}
            allowFiltering={false}
            allowSorting={false}
            isGlobal
            showColumns={false}
          />
          <Hr />
        </>
      )}

      <RepositoryList showCountryName />
    </div>
  )
}

export default Repository
