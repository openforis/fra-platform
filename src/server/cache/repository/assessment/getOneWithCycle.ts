import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'

import { getOne, PropsGetOneAssessment } from 'server/cache/repository/assessment/getOne'
import { BaseProtocol, DB } from 'server/db/db'

type Props = PropsGetOneAssessment & ({ cycleName: CycleName } | { cycleUuid: UUID })

type Returned = { assessment: Assessment; cycle: Cycle }

export const getOneWithCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const assessment: Assessment = await getOne(props, client) // getOne handles metaCache if set to true
  if (!assessment) {
    throw new Error(`Assessment not found ${JSON.stringify(props)}`)
  }

  // 2. get cycle
  let cycle: Cycle
  if ('cycleName' in props) {
    cycle = Assessments.getCycle({ assessment, cycleName: props.cycleName })
  }
  if ('cycleUuid' in props) {
    cycle = Assessments.getCycle({ assessment, cycleUuid: props.cycleUuid })
  }
  if (!cycle) {
    throw new Error(`Cycle not found ${JSON.stringify(props)}`)
  }

  // return assessment and cycle
  return { assessment, cycle }
}
