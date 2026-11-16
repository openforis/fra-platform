import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { UserController } from 'server/controller/user'

import { userMockUnknown } from 'test/integration/mock/user'

// target user with its current roles in the cycle
export const getTargetUser = (cycle: Cycle): Promise<User> =>
  UserController.getOne({ cycleUuid: cycle.uuid, email: userMockUnknown.email })
