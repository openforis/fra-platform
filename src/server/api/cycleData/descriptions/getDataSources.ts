import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { DataSourceLinkedVariable } from 'meta/assessment/description'

import { AssessmentController } from 'server/controller/assessment'
import { DescriptionController } from 'server/controller/cycleData/description'
import Requests from 'server/utils/requests'

export const getDataSources = async (
  req: CycleDataRequest<{ linkedVariable: string }>,
  res: Response
): Promise<void> => {
  try {
    const { countryIso, linkedVariable: linkedVariableStr } = req.query

    const linkedVariable = JSON.parse(linkedVariableStr) as DataSourceLinkedVariable

    const { assessmentName, cycleName, sectionName, tableName, variableName } = linkedVariable

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const dataSources = await DescriptionController.getDataSources({
      assessment,
      countryIso,
      cycle,
      sectionName,
      tableName,
      variableName,
    })

    Requests.send(res, dataSources)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
