import '../scriptInit'

import { AssessmentNames } from 'meta/assessment/assessment'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { rawClone } from './_rawClone'

const client = DB
const assessmentName = AssessmentNames.fra
const cycleName = 'latest'
const cycleNameClone = 'latest2'

export const cloneCycle = async (): Promise<void> => {
  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const clone = await rawClone({ assessmentName, cycleNameSource: cycleName, cycleNameTarget: cycleNameClone }, client)

  await DB.query(`
        delete from users_role ur 
        where ur.cycle_uuid = '${cycle.uuid}'
          and ur.country_iso in ('ARG', 'URY')`)
  await DB.query(
    `
        delete from users_invitation ui
        where ui.cycle_uuid = '${cycle.uuid}'
          and ui.country_iso in ('ARG', 'URY')
          and ui.accepted_at is null`
  )

  Logger.info(`Created / cloned new cycle: ${clone.assessment.props.name} - ${clone.cycle.name}`)
}

ToolsUtils.exec(cloneCycle)
