import { Response } from 'express'

import { CycleDataRequest, EstimateBody } from '@meta/api/request'
import { ActivityLogMessage } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { MetadataController } from '@server/controller/metadata'
import { EstimationEngine, GenerateSpec } from '@server/service/estimates/estimationEngine'
import Requests from '@server/utils/requests'

export const estimateValues = async (req: CycleDataRequest<never, EstimateBody>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName } = req.query
    const { method, tableName, fields } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const tableSpec = await MetadataController.getTable({ assessment, cycle, tableName })
    const originalDataPointValues = await CycleDataController.getOriginalDataPointData({
      countryISOs: [countryIso],
      cycle,
      assessment,
    })

    const years = tableSpec.props.columnNames[cycle.uuid].map((column: string) => Number(column))

    const changeRates: Record<string, { rateFuture: number; ratePast: number }> = {}
    fields.forEach((field) => {
      changeRates[field.variableName] = {
        rateFuture: Number(field.annualChangeRates.future),
        ratePast: Number(field.annualChangeRates.past),
      }
    })

    const generateSpec = {
      method,
      fields: fields.map((field) => field.variableName),
      changeRates,
    }

    const nodes = EstimationEngine.estimateValues(
      years,
      originalDataPointValues[assessment.props.name][cycle.name],
      generateSpec as GenerateSpec,
      tableSpec.props.name
    )

    if (nodes.length) {
      await CycleDataController.persistNodeValues({
        nodeUpdates: { assessment, cycle, countryIso, nodes },
        user: Requests.getUser(req),
        activityLogMessage: ActivityLogMessage.nodeValueEstimate,
        sectionName,
      })
    }

    return Requests.sendOk(res, nodes)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
