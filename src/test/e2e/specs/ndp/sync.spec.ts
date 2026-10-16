import { SectionNames } from 'meta/assessment/section'

import { Timeouts } from 'test/e2e/config/timeouts'
import { NdpData } from 'test/e2e/data/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X02'
const year = 2003
const ndpPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year })

const renamedClass = 'Forest land'
const dataSourcesText = 'Synced data source reference'
const commentsText = 'Synced comment'

test.describe('National data point: sync between clients', () => {
  test.use({ ndpSeeds: [[{ countryIso, nationalClasses: NdpData.getDefaultClasses(), year }], { scope: 'test' }] })

  test('another client viewing the point sees its edits', async ({
    authenticatedPage: page,
    ndp,
    otherAuthenticatedPage: otherPage,
  }) => {
    expect(ndp.id).toBeTruthy()

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(otherPage)

    // ==== national classes
    await NDPDomUtils.editNationalClassification(page, renamedClass)
    await expect(NDPDomUtils.getNationalClassNameInputs(otherPage).first()).toHaveValue(renamedClass, {
      timeout: Timeouts.medium,
    })

    // ==== original data
    await NDPDomUtils.fillNationalClassArea(page, renamedClass, '1234')
    await expect(NDPDomUtils.getNationalClassAreaCell(otherPage, renamedClass).locator('input')).toHaveValue(/1.?234/, {
      timeout: Timeouts.medium,
    })

    // ==== data sources
    await NDPDomUtils.fillDataSourcesV1Reference(page, `<p>${dataSourcesText}</p>`)
    await expect(otherPage.locator('.editor-wysiwyg-links').first()).toContainText(dataSourcesText, {
      timeout: Timeouts.medium,
    })

    // ==== comments
    await NDPDomUtils.fillComments(page, `<p>${commentsText}</p>`)
    await expect(otherPage.locator('.data-grid.odp__section.description')).toContainText(commentsText, {
      timeout: Timeouts.medium,
    })

    // ==== the editing client keeps its own edits
    await expect(NDPDomUtils.getNationalClassNameInputs(page).first()).toHaveValue(renamedClass)
    await expect(page.locator('.data-grid.odp__section.description')).toContainText(commentsText)
  })
})
