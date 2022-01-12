import React, { useEffect } from 'react'
// import { useAppDispatch } from '@client/store'
import Navigation from '@client/components/Navigation'
// import { AssessmentActions } from '@client/store/assessment'

const Assessment: React.FC = () => {
  // const dispatch = useAppDispatch()

  // TODO: get these from settings
  // const name = 'fra'
  // const cycleName = '2025'

  useEffect(() => {
    // dispatch(AssessmentActions.getSections({ name, cycleName ))
  }, [])
  return (
    <>
      <Navigation />
    </>
  )
}

export default Assessment
