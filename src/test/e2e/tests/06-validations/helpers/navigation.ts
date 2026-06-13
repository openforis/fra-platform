import { expect, type Locator, type Page } from '@playwright/test'

import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

type SectionPathProps = {
  countryIso: CountryIso
  sectionName: string
}

export const sectionPath = (props: SectionPathProps): string => {
  const { countryIso, sectionName } = props
  return `/assessments/${assessmentName}/${cycleName}/${countryIso}/sections/${sectionName}`
}

type ExpectErrorIndicatorProps = {
  locator: Locator
  visible: boolean
}

const _expectErrorIndicator = async (props: ExpectErrorIndicatorProps): Promise<void> => {
  const { locator, visible } = props
  const indicator = locator.locator('.validation-error-indicator')
  if (visible) {
    await expect(indicator).toBeVisible({ timeout: 20000 })
  } else {
    await expect(indicator).toHaveCount(0, { timeout: 20000 })
  }
}

type ExpectNavigationErrorProps = {
  countryIso: CountryIso
  hasError: boolean
  sectionHeader: string
  sectionName: string
}

export const expectNavigationError = async (page: Page, props: ExpectNavigationErrorProps): Promise<void> => {
  const { countryIso, hasError, sectionHeader, sectionName } = props
  const subSectionItem = page.locator(`.nav-section__item[href="${sectionPath({ countryIso, sectionName })}"]`)
  const header = page.locator('.nav-section__header', { hasText: sectionHeader })

  await _expectErrorIndicator({ locator: subSectionItem, visible: hasError })
  await header.click()
  await _expectErrorIndicator({ locator: header, visible: hasError })
}
