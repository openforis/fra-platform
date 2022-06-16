import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { EstimationEngine, GenerateSpec } from '@server/service/estimates/estimationEngine'
import Requests from '@server/utils/requests'

export const postEstimation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { countryIso, assessmentName, cycleName, method, tableName, fields } = <
      Record<string, string> & {
        countryIso: CountryIso
        fields: Array<{
          annualChangeRates: { past: string; future: string }
          variableName: string
        }>
      }
    >req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: assessmentName,
      cycleName,
      metaCache: true,
    })

    const tableSpec = await AssessmentController.getTable({ assessment, cycle, tableName })
    const originalDataPointValues = await CycleDataController.getOriginalDataPointData({
      countryISOs: [countryIso as CountryIso],
      cycle,
      assessment,
    })

    const years = tableSpec.props.columnNames[cycle.uuid].map((column: string) => Number(column))

    if (method === 'clearTable') {
      await CycleDataController.deleteNodeValues({
        user: Requests.getRequestUser(req),
        assessment,
        cycle,
        table: tableSpec,
        columnNames: years.map(String),
        countryISOs: [countryIso as CountryIso],
        variableNames: fields.map((field) => field.variableName),
      })
      return Requests.sendOk(res)
    }

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
      originalDataPointValues,
      generateSpec as GenerateSpec,
      tableSpec.props.name
    )

    if (nodes.length) {
      await CycleDataController.persistNodeValues({
        nodeUpdates: {
          assessment,
          cycle,
          countryIso,
          nodes,
        },
        user: Requests.getRequestUser(req),
      })
    }

    return Requests.sendOk(res)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
