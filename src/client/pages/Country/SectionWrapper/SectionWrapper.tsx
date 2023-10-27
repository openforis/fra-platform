import React, { PropsWithChildren, useLayoutEffect } from 'react'

import { useSections, useTableSections } from 'client/store/metadata'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import MessageCenter from 'client/components/MessageCenter'
import { DOMs } from 'client/utils/dom'

import { useReviewStatusListener } from './hooks/useReviewStatusListener'

const SectionWrapper: React.FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { sectionName } = useSectionRouteParams()
  const sections = useSections()
  const tableSections = useTableSections({ sectionName })
  useReviewStatusListener()
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
