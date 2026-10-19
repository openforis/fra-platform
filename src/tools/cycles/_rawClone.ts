import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessmentName: AssessmentName
  cycleNameSource: CycleName
  cycleNameTarget: CycleName
}

type Returned = Awaited<ReturnType<typeof AssessmentController.cloneCycle>>

export const rawClone = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessmentName, cycleNameSource, cycleNameTarget } = props

  const propsGet = { assessmentName, cycleName: cycleNameSource }
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(propsGet, client)
  await DB.query(`drop schema if exists ${Schemas.getNameCycle(assessment, { name: cycleNameTarget })} cascade;`)

  const user = await UserController.getOne({ email: 'fra@fao.org' }, client)

  return AssessmentController.cloneCycle({ assessment, cycleSource: cycle, name: cycleNameTarget, user }, client)
}
