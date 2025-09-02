import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getMetaCacheEntryKey = (props: Props): string => {
  const { assessment, cycle } = props

  return `${assessment.props.name}-${cycle.name}`
}
