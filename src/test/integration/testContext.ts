import { Section } from 'meta/assessment/section'
import { TableSection } from 'meta/assessment/tableSection'

type TestContext = {
  section?: Section
  tableSection?: TableSection
}

export const testContext: TestContext = {}
