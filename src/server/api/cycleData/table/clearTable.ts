import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { MetadataController } from '@server/controller/metadata'
import Requests from '@server/utils/requests'

export const clearTable = async (req: CycleDataRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName, tableName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const rows = await MetadataController.getRows({
      assessment,
      tableName,
      includeCols: true,
    })

    const nodes = rows.reduce((acc, row) => {
      if (!row.props.variableName || row.props.readonly) {
        return acc
      }
      const { variableName } = row.props

      const columnNames = row.cols.reduce((acc, col) => {
        if (!col.props.colName || col.props.readonly) {
          return acc
        }
        return [...acc, col.props.colName]
      }, [])

      return [
        ...acc,
        ...columnNames.map((colName) => ({
          tableName,
          variableName,
          colName,
          value: { raw: null },
        })),
      ]
    }, [])

    await CycleDataController.persistNodeValues({
      nodeUpdates: {
        assessment,
        cycle,
        countryIso,
        nodes,
      },
      sectionName,
      user: Requests.getUser(req),
    })

    return Requests.sendOk(res)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
