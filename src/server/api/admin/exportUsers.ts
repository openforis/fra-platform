import { Response } from 'express'

import { AdminUsersRequest } from 'meta/api/request/admin/users'
import { User } from 'meta/user'

import { getUsersGetManyPropsFromRequest } from 'server/api/admin/_getUsersGetManyPropsFromRequest'
import { UserController } from 'server/controller/user'
import { ExportService } from 'server/service/export'
import Requests from 'server/utils/requests'

export const exportUsers = async (req: AdminUsersRequest, res: Response): Promise<void> => {
  try {
    const props = await getUsersGetManyPropsFromRequest(req)

    const { assessment, cycle } = props
    const fileName = `users-${assessment.props.name}-${cycle.name}.csv`
    const user = Requests.getUser(req)
    const lang = req.query.lang ?? user.props.lang

    const { query, queryParams, rowTransformer } = await UserController.getManyExport({ ...props, lang })

    await ExportService.queryToCsvResponseStream<User>({ fileName, query, queryParams, res, rowTransformer })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
