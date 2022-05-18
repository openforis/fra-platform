import { CountryIso } from '@meta/area'
import { Assessment, Cycle, NodeValue } from '@meta/assessment'
import { User } from '@meta/user'

import { persistNodeValue } from './persistNodeValue'

type NodeUpdates = {
  assessment: Assessment
  cycle: Cycle
  values: Array<{ countryIso: CountryIso; colName: string; tableName: string; variableName: string; value: NodeValue }>
}
interface Props {
  nodes: NodeUpdates
  user: User
}

// Wrapper to support persisting full tables
export const persistNodeValues = async (props: Props): Promise<void> => {
  const {
    user,
    nodes: { assessment, cycle, values },
  } = props

  const promises = values.map((value) => {
    return persistNodeValue({
      user,
      ...value,
      assessment,
      cycle,
    })
  })
  await Promise.all(promises)
}
