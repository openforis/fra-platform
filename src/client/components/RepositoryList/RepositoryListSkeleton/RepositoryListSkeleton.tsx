import React from 'react'

const ROW_COUNT = 6

const RepositoryListSkeleton: React.FC = () => (
  <>
    {Array.from({ length: ROW_COUNT }).map((_, i) => (
      <div key={i} className="repository-list-item" />
    ))}
  </>
)

export default RepositoryListSkeleton
