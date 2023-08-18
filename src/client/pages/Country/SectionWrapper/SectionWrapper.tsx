import React, { PropsWithChildren, useLayoutEffect } from 'react'

import { useGetTableSections, useSections, useTableSections } from 'client/store/metadata'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import MessageCenter from 'client/components/MessageCenter'
import { DOMs } from 'client/utils/dom'

const SectionWrapper: React.FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { sectionName } = useSectionRouteParams()
  const sections = useSections()
  const tableSections = useTableSections({ sectionName })
  useGetTableSections()

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
