import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs/promises'
import * as path from 'path'

import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { Logger } from 'server/utils/logger'

// TODO
const AssessmentFileRepository = {}

const exec = async () => {
  const dirName = path.resolve(__dirname, 'files')
  const dir = await fs.readdir(dirName)

  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra })

  dir.forEach((originalname) => {
    // console.log(fileName)
    fs.readFile(path.join(dirName, originalname)).then(async (buffer) => {
      Logger.info(`file read`, originalname)

      const file = { originalname, buffer }
      // @ts-ignore
      await AssessmentFileRepository.create({ assessment, file, private: true })
    })
  })
}

exec().then(() => {
  Logger.info(`Executed successfully`)
})
