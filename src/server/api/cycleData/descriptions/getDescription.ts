import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleDataRequest<{ name?: CommentableDescriptionName }>

/**
 * @openapi
 * /cycle-data/descriptions:
 *   get:
 *     summary: Get Descriptions by cycle and country
 *     parameters:
 *       - $ref: '#/components/parameters/assessmentName'
 *       - $ref: '#/components/parameters/countryIso'
 *       - $ref: '#/components/parameters/cycleName'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DescriptionCountryValues'
 *             example:
 *               FIN:
 *                 carbonStock:
 *                   dataSources:
 *                     text: "<p>HTML-formatted content</p>"
 *                     dataSources:
 *                       - type: nationalForestInventory
 *                         uuid: a1b2c3d4-e5f6-7a89-b0c1-d2e3f4a5b6c7
 *                         year: "2019-2022"
 *                         comments: ""
 *                         reference: "<p>Reference text</p>"
 *                         variables:
 *                           - carbon_forest_above_ground
 *                           - carbon_forest_below_ground
 *                   generalComments:
 *                     text: "<p>HTML-formatted content</p>"
 *                 disturbances:
 *                   generalComments:
 *                     text: "<p>HTML-formatted content</p>"
 *                 extentOfForest:
 *                   generalComments:
 *                     text: "<p>HTML-formatted content</p>"
 *                 forestPolicy:
 *                   dataSources:
 *                     text: "<p>HTML-formatted content</p>"
 *                   generalComments:
 *                     text: "<p>HTML-formatted content</p>"
 *       401:
 *         description: Unauthorized access.
 */

export const getDescription = async (req: Request, res: Response) => {
  try {
    const { assessmentName, sectionName, cycleName, countryIso, name } = req.query

    const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const propsValues = { assessment, cycle, countryIso, sectionName, name }
    const values = await CycleDataController.Description.getDescriptionValues(propsValues)

    Requests.send(res, values)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
