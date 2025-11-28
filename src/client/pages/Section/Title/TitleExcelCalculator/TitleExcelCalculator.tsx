import React from 'react'

import { useIsPrintRoute } from 'client/hooks/routes'
import Flex from 'client/components/Layout/Flex'
import { TitleDefault } from 'client/pages/Section/Title/Components'

import { Props } from '../props'
import ExcelCalculatorDownload from './ExcelCalculatorDownload'

const TitleExcelCalculator: React.FC<Props> = (props) => {
  const { subSection } = props
  const { print } = useIsPrintRoute()

  return (
    <Flex justifyContent="space-between">
      <TitleDefault subSection={subSection} />

      {!print && <ExcelCalculatorDownload />}
    </Flex>
  )
}

export default TitleExcelCalculator
