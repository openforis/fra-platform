import { expect, type Page } from '@playwright/test'

import { type NodesBodyValue } from 'meta/api/request/cycleData/table'
import { type SectionName } from 'meta/assessment/section'
import { type TableName } from 'meta/assessment/table'

type PatchProps = {
  assessmentName: string
  countryIso: string
  cycleName: string
  sectionName: SectionName
  tableName: TableName
  values: Array<NodesBodyValue>
}

const patch = async (page: Page, props: PatchProps): Promise<void> => {
  const { assessmentName, countryIso, cycleName, sectionName, tableName, values } = props
  const params = new URLSearchParams({ assessmentName, countryIso, cycleName })
  params.set('sectionName', sectionName)

  const response = await page.request.patch(`/api/cycle-data/table/nodes?${params.toString()}`, {
    data: { tableName, values },
  })

  expect(response.ok()).toBeTruthy()
}

export const NodeValueUtils = {
  patch,
}
