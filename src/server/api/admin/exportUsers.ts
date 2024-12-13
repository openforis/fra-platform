import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { User } from 'meta/user'

import { getUsersGetManyPropsFromRequest } from 'server/api/admin/_getUsersGetManyPropsFromRequest'
import { UserController } from 'server/controller/user'
import { ExportService } from 'server/service/export'
import Requests from 'server/utils/requests'

export const exportUsers = async (req: UsersRequest, res: Response) => {
  try {
    const props = await getUsersGetManyPropsFromRequest(req)

    const { assessment, cycle } = props
    const fileName = `users-${assessment.props.name}-${cycle.name}.csv`
    const user = Requests.getUser(req)
    const { lang } = user.props

    const { query, queryParams, rowTransformer } = await UserController.getManyExport({ ...props, lang })

    await ExportService.queryToCsvResponseStream<User>({ fileName, query, queryParams, res, rowTransformer })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
