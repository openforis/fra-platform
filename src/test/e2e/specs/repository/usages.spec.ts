import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { type DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { SectionNames } from 'meta/assessment/section'
import { type RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryIso: CountryIso = 'X01'
const seededYear = 2011
const linkLabel = `E2E ndp usage link ${Date.now()}`

const repositoryQuery = new URLSearchParams({ assessmentName, countryIso, cycleName }).toString()
const repositoryItemUrl = `${ApiEndPoint.CycleData.Repository.one()}?${repositoryQuery}`
const dataSourcesQuery = new URLSearchParams({
  assessmentName,
  countryIso,
  cycleName,
  sectionName: SectionNames.extentOfForest,
}).toString()
const dataSourcesUrl = `${ApiEndPoint.CycleData.NationalDataPoint.dataSources()}?${dataSourcesQuery}`

// == Check that repository item usages are shown correctly in the Repository item listing
test.describe('Repository: usages', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  let repositoryItem: RepositoryItem | undefined

  test.afterEach(async ({ authenticatedPage }) => {
    if (Objects.isNil(repositoryItem)) return

    await authenticatedPage.request.delete(`${repositoryItemUrl}&uuid=${repositoryItem.uuid}`)
    repositoryItem = undefined
  })

  test('Admin sees the national data point that references a repository link', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage

    const createResponse = await page.request.post(repositoryItemUrl, {
      multipart: {
        'repositoryItem.countryIso': countryIso,
        'repositoryItem.link': 'https://example.com/ndp-usage',
        'repositoryItem.props.public': 'false',
        'repositoryItem.props.translation.en': linkLabel,
      },
    })
    expect(createResponse.ok(), await createResponse.text()).toBeTruthy()
    repositoryItem = await createResponse.json()

    const fileHref = `${ApiEndPoint.CycleData.Repository.File.one(repositoryItem.uuid)}?${repositoryQuery}`
    const reference = `<div><a href="${fileHref}" target="_blank">${linkLabel}</a></div>`
    const dataSources: Array<DataSource> = [{ comments: '', reference, type: [], uuid: crypto.randomUUID() }]
    const dataSourcesResponse = await page.request.put(dataSourcesUrl, {
      data: { originalDataPoint: { ...ndp, dataSources } },
    })
    expect(dataSourcesResponse.ok(), await dataSourcesResponse.text()).toBeTruthy()

    await page.goto(`/assessments/${assessmentName}/${cycleName}/${countryIso}/home/repository`)
    await DOMUtils.ensureEditingUnlocked(page)

    await page.locator('.repository-list-item', { hasText: linkLabel }).locator('button').click()

    await expect(page.locator('.repository-form__usage')).toHaveText([`National data point ${seededYear} (References)`])
  })
})
