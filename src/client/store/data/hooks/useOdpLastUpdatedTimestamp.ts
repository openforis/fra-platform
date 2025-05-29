import { useAppSelector } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks'

export type Params = {
  sectionName: string
}

export const useOdpLastUpdatedTimestamp = (): { time?: string } => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  return useAppSelector(
    (state) => state.data.odpLastUpdatedTimestamp?.[assessment.props.name]?.[cycle.name]?.[countryIso] ?? {}
  )
}
