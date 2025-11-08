import '../scriptInit'

import axios from 'axios'
import { Arrays } from 'utils/arrays'
import { Promises } from 'utils/promises'

import { Link } from 'meta/cycleData'
import { FileSummary } from 'meta/file'

import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { AssessmentController } from 'server/controller/assessment'
import { FileStorage } from 'server/service/fileStorage'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const client = DB

// Note: Running this script many times may cause runners IP to timeout as protection mechanism
// Get from browser cookies
const COOKIE = ''

// 1 -- Test all files exist in s3
const TEST_S3_FILES = true
// 2 -- Test links in assessment_cycle.link work (redundant if files exist)
const TEST_LINKS = false

const BATCH_SIZE = 25

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms))

const _allFilesExist = async (files: Array<FileSummary>): Promise<boolean> => {
  if (!TEST_S3_FILES) return true
  const batches = Arrays.chunk(files, BATCH_SIZE)
  const batchResults = await Promises.each(batches, async (batch) => {
    return Promises.each(batch, async ({ uuid: key }) => {
      const exists = await FileStorage.File.exists({ key })
      if (!exists) Logger.info(`Missing file in S3: ${key}`)
      return exists
    })
  })

  return batchResults.flat().every((exists) => exists)
}

const _testFileDownload = async (url: string): Promise<boolean> => {
  try {
    await sleep(1000)
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
      timeout: 5000,
      validateStatus: (status) => status === 200,
      headers: {
        // Copy this from browser request and add it to .env - check .env.template
        Cookie: COOKIE,
      },
    })

    const contentDisposition = response.headers['content-disposition']
    const contentType = response.headers['content-type']

    // dont persist
    response.data.destroy()

    // Either should be set
    return Boolean(contentDisposition || contentType)
  } catch (error) {
    Logger.error(`Failed to test download for ${url}: ${error.message}`)
    return false
  }
}

const _allFileLinksWork = async (): Promise<boolean> => {
  if (!TEST_LINKS) return true
  const assessments = await AssessmentController.getAll({})
  const schemas = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => Schemas.getNameCycle(assessment, cycle))
  )

  // Replace production URL with appUri (e.g. localhost)
  const cb = ({ link }: Link): string => link.replace('https://fra-data.fao.org', ProcessEnv.appUri)

  const linksTested = await Promises.each(schemas, async (schema) => {
    const links = await client.map<string>(
      `select * from ${schema}.link where link ilike '%https://fra-data.fao.org/api/cycle-data/repository/file/%'`,
      [],
      cb
    )
    const results = await Promises.each(links, async (link) => {
      const result = await _testFileDownload(link)
      return result
    })
    // Every link OK?
    return results.every(Boolean)
  })

  // Every link in every assessment OK?
  return linksTested.every(Boolean)
}

const exec = async (): Promise<void> => {
  const files = await client.many<FileSummary>(`select * from public.file`)
  const allFilesExist = await _allFilesExist(files)
  const allFileLinksWork = await _allFileLinksWork()

  Logger.debug(`All files exist in S3? ${allFilesExist ? 'yes' : 'no'}`)
  Logger.debug(`All links work? ${allFileLinksWork ? 'yes' : 'no'}`)
}

const start = new Date().getTime()
Logger.debug(`========== START FETCHING S3 FILES ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  DB.$pool.end()
  process.exit(0)
})
