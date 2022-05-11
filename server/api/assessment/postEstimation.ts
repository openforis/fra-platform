import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { TableRepository } from '@server/repository/assessment/table'
import { DataRepository } from '@server/repository/assessmentCycle/data'
import { EstimationEngine, GenerateSpec } from '@server/service/estimates/estimationEngine'
import Requests from '@server/utils/requests'

export const postEstimation = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName, method, tableName } = <Record<string, string>>req.query
    const { fields } = <
      {
        fields: Array<{
          annualChangeRates: { past: string; future: string }
          variableName: string
        }>
      }
    >req.body
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const tableSpec = await TableRepository.getOne({ assessment, cycle, tableName })
    const originalDataPointValues = await DataRepository.getOriginalDataPointData({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
    })

    const years = tableSpec.props.columnNames.map((column: string) => Number(column))
    const values = originalDataPointValues
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

    const estimates = EstimationEngine.estimateValues(years, values, generateSpec as GenerateSpec, sectionName)

    // TODO: Update data, return updated tableData

    Requests.send(res, estimates)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
