import React from 'react'
import { useSelector } from 'react-redux'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import NationalDataPointsPrintView from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import { useI18n, usePrintView } from '@webapp/components/hooks'

type Props = {
  sectionName: string
}
const ForestCharacteristics = (props: Props) => {
  const { sectionName } = props
  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const hasOdps = useSelector(ForestCharacteristicsState.hasOriginalDataPoints)
  return (
    <>
      <h2 className="headline no-print">{(i18n as any).t(`${sectionName}.${sectionName}`)}</h2>

      {hasOdps && printView && !printOnlyTablesView && (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ i18n: unknown; section: string; }' is not ... Remove this comment to see the full error message
        <NationalDataPointsPrintView i18n={i18n} section={sectionName} />
      )}
    </>
  )
}
export default ForestCharacteristics
