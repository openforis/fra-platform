import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { FileController } from 'server/controller/file'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create files to write activity log', async () => {
    const { assessment, cycle, user } = testContext.activityLog
    const buffer = Buffer.from('test')
    const multerFile = { buffer, originalname: 'test.txt', size: buffer.length } as Express.Multer.File

    const [file] = await FileController.createMany({ assessment, cycle, files: [multerFile], user })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.fileCreate,
      section: 'assessment',
      target: { fileName: file.name, uuid: file.uuid },
      user,
    })

    testContext.activityLogFile = file
  })
}
