import { useAssessment, useCycle } from 'client/store/assessment'
import { useAppSelector } from 'client/store/store'
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
