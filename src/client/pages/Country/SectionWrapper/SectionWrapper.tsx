import React, { PropsWithChildren, useLayoutEffect } from 'react'

import { useSections } from 'client/store/meta/hooks/sections'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import MessageCenter from 'client/components/MessageCenter'
import { useGetNationalDataPointValidations } from 'client/pages/Country/hooks/useGetNationalDataPointValidations'
import { DOMs } from 'client/utils/doms'

import { useReviewStatusListener } from './hooks/useReviewStatusListener'

const SectionWrapper: React.FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { sectionName } = useSectionRouteParams()
  const sections = useSections()
  const tableSections = useTableSections({ sectionName })
  useReviewStatusListener()
  useGetNationalDataPointValidations()
  useLayoutEffect(() => {
    // scroll to top
    DOMs.scrollTo()
  }, [sectionName])

  if (!sections || !tableSections) return null

  return (
    <>
      <MessageCenter />
      {React.Children.toArray(children)}
    </>
  )
}

export default SectionWrapper
