import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CountryIso, RegionCode } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetTableDataRequest = CycleDataRequest<{
  columns: Array<string>
  countryISOs: Array<CountryIso>
  mergeOdp: string
  regionCode?: RegionCode
  tableNames: Array<string>
  variables: Array<string>
}>

/**
 * @openapi
 * /cycle-data/table/table-data:
 *   get:
 *     summary: Get table data
 *     parameters:
 *       - $ref: '#/components/parameters/assessmentName'
 *       - $ref: '#/components/parameters/cycleName'
 *       - in: query
 *         name: columns[]
 *         description: Array of columns to retrieve. For example, ["1990"].
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["1990"]
 *         style: form
 *         explode: true
 *       - in: query
 *         name: countryIso
 *         description: A single country ISO code like "FIN", or a region like "EU".
 *         required: true
 *         schema:
 *           type: string
 *           example: EU
 *       - in: query
 *         name: countryISOs[]
 *         description: Array of country ISO codes. For example, ["FIN", "ITA"].
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["FIN", "ITA"]
 *         style: form
 *         explode: true
 *       - in: query
 *         name: mergeOdp
 *         description: A flag indicating whether to merge ODP data. Defaults to "true" if omitted.
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *           default: "true"
 *           example: "true"
 *       - in: query
 *         name: regionCode
 *         description: Specifies the region code for aggregating table data. When provided, country-level filters are ignored and the data is grouped by region (e.g., "EU").
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: tableNames[]
 *         description: Array of table names. For example, ["extentOfForest"].
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["extentOfForest"]
 *         style: form
 *         explode: true
 *       - in: query
 *         name: variables[]
 *         description: Array of variable names to retrieve. For example, ["forestArea"].
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["forestArea"]
 *         style: form
 *         explode: true
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               description: The resulting table data.
 *               $ref: '#/components/schemas/RecordAssessmentData'
 *             example:
 *               fra:
 *                 "2020":
 *                   FIN:
 *                     extentOfForest:
 *                       "1990":
 *                         total:
 *                           odp: true
 *                           raw: "21875.33"
 *                           odpId: 231
 *                         otherLand:
 *                           odp: true
 *                           raw: "7589.76999"
 *                           odpId: 231
 *                         forestArea:
 *                           odp: true
 *                           raw: "21875.33"
 *                           odpId: 231
 *       401:
 *         description: Unauthorized access.
 */

export const getTableData = async (req: GetTableDataRequest, res: Response) => {
  try {
    const {
      assessmentName,
      columns,
      countryISOs,
      cycleName,
      mergeOdp: mergeOdpReq,
      regionCode,
      tableNames = [],
      variables,
    } = req.query
    // if mergeOdp is not passed, then by default result data includes odp for table 1a and 1b if available
    const mergeOdp = !mergeOdpReq || mergeOdpReq === 'true'

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    // When fetching data for regions, use getAggregatedTableData
    const getData = regionCode ? CycleDataController.TableData.getAggregatedTableData : CycleDataController.getTableData

    const props = { assessment, cycle, regionCode, countryISOs, tableNames, variables, columns, mergeOdp }
    const table = await getData(props)

    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
