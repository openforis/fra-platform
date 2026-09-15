import 'dotenv/config'

import { RedisData } from 'server/cache/repository/redisData'
import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/tableData/updateDependencies/queueFactory'
import { WorkerFactory } from 'server/controller/cycleData/tableData/updateDependencies/workerFactory'
import { DB } from 'server/db/db'
import { VisitCycleLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'
import { WorkerFactory as VisitLinksWorkerFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/workerFactory'

import countryIso from 'test/integration/area/countryIso'
import assessmentCreate from 'test/integration/assessment/createAssessment'
import originalDataPoint from 'test/integration/assessment/originalDataPoint'
import assessmentRemove from 'test/integration/assessment/removeAssessment'
import messageCenter from 'test/integration/messageCenter/messageCenter'
import sectionCreateChild from 'test/integration/section/createChildSection'
import sectionCreate from 'test/integration/section/createSection'
import sectionRemove from 'test/integration/section/removeSection'
import sectionUpdate from 'test/integration/section/updateSection'
import sectionUpdateChild from 'test/integration/section/updateSubSection'
import tableCreate from 'test/integration/table/createTable'
import tableRemove from 'test/integration/table/removeTable'
import tableUpdate from 'test/integration/table/updateTable'
import tableSectionCreate from 'test/integration/tableSection/createTableSection'
import tableSectionRemove from 'test/integration/tableSection/removeTableSection'
import tableSectionUpdate from 'test/integration/tableSection/updateTableSection'
import userInvite from 'test/integration/user/userInvite'
import userRemove from 'test/integration/user/userRemove'
import userResetPassword from 'test/integration/user/userResetPassword'

import userCreate from './user/userCreate'

afterAll(async () => {
  await DB.$pool.end()
  // quick and dirty workaround to close redis connection after running integration tests
  // TODO: find a better strategy to handle Redis connections
  UpdateDependenciesQueueFactory.connection.quit()
  WorkerFactory.connection.quit()
  VisitCycleLinksQueueFactory.connection.quit()
  VisitLinksWorkerFactory.connection.quit()
  RedisData.getInstance().quit()
})

describe('Metadata integration test', () => {
  // area
  countryIso()

  // TODO: rename userCreate to userAdminCreate (and add mock user as admin)
  userCreate()

  // assessment
  assessmentCreate()

  // section
  sectionCreate()
  sectionCreateChild()
  sectionUpdate()
  sectionUpdateChild()
  sectionRemove()

  // tableSection
  tableSectionCreate()
  tableSectionUpdate()
  tableSectionRemove()

  // table
  tableCreate()
  tableUpdate()
  tableRemove()

  // user
  userInvite()
  userResetPassword()
  originalDataPoint()
  messageCenter()

  // remove from db
  assessmentRemove()
  userRemove()
})
