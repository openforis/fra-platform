import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'
import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem, Translations } from 'meta/cycleData'
import { LanguageCodes } from 'meta/lang'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const getLinks = (params: string) => {
  const links = [
    {
      href: 'https://unfccc.int/process/parties-non-party-stakeholders/parties/national-focal-point',
      key: 'unfcccFocalPoints',
    },
    {
      href: `${ApiEndPoint.File.sdgFocalPoints()}?${params}`,
      key: 'sdgFocalPoints',
    },
    { href: 'https://slms4redd.org/', key: 'reddPortal' },
    { href: 'https://geofra.users.earthengine.app/view/geofra-dev', key: 'fraGeoSpatialTools' },
  ]
  return links
}
const i18nBase = 'landing.links'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const params = new URLSearchParams({ assessmentName, cycleName, countryIso: 'WO' }).toString()
    const links = getLinks(params)

    const repositoryItems: Array<RepositoryItem> = await Promise.all(
      links.map(async ({ key, href }) => {
        const repositoryItem: RepositoryItem = {
          link: href,
          props: {
            translations: {
              en: '',
            },
          },
        } as RepositoryItem

        const props = await Promise.all(
          LanguageCodes.map(async (lang) => {
            const i18n = (await createI18nPromise(lang)) as i18nType
            return { [lang]: i18n.t(`${i18nBase}.${key}`) }
          })
        )
        repositoryItem.props.translations = props.reduce<Translations>(
          (acc, val) => Object.assign(acc, val),
          {} as Translations
        )

        return repositoryItem
      })
    )

    const pgp = pgPromise()
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const columns = ['link', { name: 'props', cast: 'jsonb' }]
    const table = { table: 'repository', schema: schemaCycle }
    const cs = new pgp.helpers.ColumnSet(columns, { table })
    const query = pgp.helpers.insert(repositoryItems, cs)
    await client.query(query)
  })
}
