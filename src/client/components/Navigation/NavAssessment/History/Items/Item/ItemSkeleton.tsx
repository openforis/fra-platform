import './Item.scss'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const ItemSkeleton: React.FC = () => {
  return (
    <>
      <div className="history-item__separator">
        <div className="marker">
          <div />
        </div>
      </div>

      <div className="history-item__content skeleton">
        <Skeleton borderRadius="100%" containerClassName="history-item__avatar" height="100%" width="100%" />

        <div>
          <div className="history-item__content-text-skeleton">
            <Skeleton borderRadius="2px" height="10px" width="100px" />
          </div>

          <div className="history-item__content-text-skeleton">
            <Skeleton borderRadius="2px" height="15px" width="140px" />
          </div>
        </div>
      </div>
    </>
  )
}
