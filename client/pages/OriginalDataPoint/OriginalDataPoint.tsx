import React, { useEffect } from 'react'
import { useAppDispatch } from '@client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/data/originalDataPoint'
import { useParams } from 'react-router-dom'

const OriginalDataPoint = () => {
  const dispatch = useAppDispatch()
  const originalDataPoint = useOriginalDataPoint()
  const { assessmentName, cycleName, odpId } = useParams<{ assessmentName: string; cycleName: string; odpId: string }>()

  useEffect(() => {
    dispatch(
      OriginalDataPointActions.fetchOriginalDataPoint({
        odpId,
        assessmentName,
        cycleName,
      })
    )
  }, [])

  return <div />
}
export default OriginalDataPoint
