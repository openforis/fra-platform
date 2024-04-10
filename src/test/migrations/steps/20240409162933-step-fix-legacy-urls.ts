import { JSDOM } from 'jsdom'
import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment, CommentableDescription, CommentableDescriptionValue, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'
import { FileRepository } from 'server/repository/public/file'
import { Logger } from 'server/utils/logger'

// Example of legacyUrl url: https://fra-platform.herokuapp.com/api/fileRepository/RWA/file/681
const legacyUrl = 'api/fileRepository'
const _fixImgTags = async (
  htmlString: string,
  assessment: Assessment,
  cycle: Cycle,
  client: BaseProtocol
): Promise<string> => {
  if (htmlString.length === 0) return htmlString

  const dom = new JSDOM(htmlString)
  const doc = dom.window.document

  const imgTags = doc.querySelectorAll('img')

  if (imgTags.length === 0) return htmlString

  for (let i = 0; i < imgTags.length; i += 1) {
    const anchor = imgTags[i]
    const src = anchor.getAttribute('src') // eg: http://fra-platform.herokuapp.com/api/fileRepository/MAR/file/430

    const id = src.split('/').pop()
    const countryIso = src.split('/').at(-3)
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    // eslint-disable-next-line no-await-in-loop
    const file = await client.oneOrNone<{ name: string }>(
      `select file_name as name from _legacy.repository where id = $1`,
      [id]
    )

    if (!file) {
      Logger.error('----------')
      const prefix = `[${assessmentName} ${cycleName} ${countryIso}]`
      Logger.error(
        `${prefix} File with id ${id} not found. File has been most likely deleted after migrations or replaced with a new one.`
      )
      Logger.error(`${prefix} Image src: ${src}`)
    } else {
      // eslint-disable-next-line no-await-in-loop
      const { uuid } = await FileRepository.getOne({ fileName: file.name }, client)
      // eslint-disable-next-line no-await-in-loop
      const repositoryItem = await RepositoryRepository.getOne({ assessment, cycle, fileUuid: uuid }, client)

      const urlParams = new URLSearchParams({ assessmentName, cycleName, countryIso })
      const newUrl = `${ApiEndPoint.CycleData.Repository.File.one(repositoryItem.uuid)}?${urlParams.toString()}`
      anchor.setAttribute('src', newUrl)
    }
  }

  return doc.body.innerHTML
}

const _fixValue = async (
  value: CommentableDescriptionValue,
  assessment: Assessment,
  cycle: Cycle,
  client: BaseProtocol
): Promise<CommentableDescriptionValue> => {
  const text = await _fixImgTags(value.text, assessment, cycle, client)
  return {
    ...value,
    text,
  }
}

const _fixDescription = async (
  description: CommentableDescription,
  assessment: Assessment,
  cycle: Cycle,
  client: BaseProtocol
): Promise<CommentableDescription> => {
  const value = await _fixValue(description.value, assessment, cycle, client)
  return { ...description, value }
}

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      const descriptions = await client.map<CommentableDescription>(
        `
            select * from ${schemaName}.descriptions
            where value ->> 'text' ilike '%${legacyUrl}%'
          `,
        [],
        (row) => Objects.camelize(row)
      )
      if (descriptions.length === 0) {
        return
      }
      Logger.debug(`Fixing ${descriptions.length} descriptions for: ${assessment.props.name} ${cycle.name}`)

      const fixedDescriptions = await Promise.all(
        descriptions.map((d) => _fixDescription(d, assessment, cycle, client))
      )

      const pgp = pgPromise()
      const cs = new pgp.helpers.ColumnSet<CommentableDescription>(
        [
          {
            name: 'value',
            cast: 'jsonb',
          },
          {
            name: 'id',
            cast: 'bigint',
            cnd: true,
          },
        ],
        {
          table: { table: 'descriptions', schema: schemaName },
        }
      )

      const query = `${pgp.helpers.update(fixedDescriptions, cs)} where v.id = t.id;`
      await client.query(query)

      fixedDescriptions.forEach((d) => {
        const url = process.env.APP_URI.replace('9001', '9000')
        Logger.debug(
          `fixed: ${url}/assessments/${assessment.props.name}/${cycle.name}/${d.countryIso}/sections/${d.sectionName}`
        )
      })
    })
  })
}
