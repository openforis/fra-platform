import { Assessment, Cycle } from 'meta/assessment'

type Props = {
  assessment: Assessment
  cycle: Cycle
  key: string
}

export const getKey = (props: Props): string => {
  const { assessment, cycle, key } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return `${key}:${assessmentName}-${cycleName}`
}
