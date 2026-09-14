import { AssessmentNames } from 'meta/assessment/assessment'
import { SectionNames } from 'meta/assessment/section'

import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const customSectionNames: Array<SectionNames> = [
  SectionNames.contacts,
  SectionNames.nationalDataPoint,
  SectionNames.originalDataPoints,
]

// integration test to check that db and SectionNames enum are exact match
// SectionNames contain both FRA and PanEuropean sections
export default (): void =>
  test('Expect SectionNames enum to be 1:1 with every assessment section table', async () => {
    const assessmentNames = [AssessmentNames.fra, AssessmentNames.panEuropean]

    const dbNames = await Promise.all(
      assessmentNames.map(async (assessmentName) => {
        const schemaName = Schemas.getSchemaAssessment({ assessmentName })
        return DB.map<string>(
          `select distinct props ->> 'name' as name from ${schemaName}.section where props ->> 'name' is not null and props ->> 'name' != ''`,
          [],
          (row) => row.name
        )
      })
    )

    // Note: FRA and PanEuropean have overlapping sections:
    // carbonStock
    // growingStock
    // growingStockComposition
    const dbSectionNames = [...new Set(dbNames.flat())]
    const enumSectionNames = Object.values(SectionNames).filter((name) => !customSectionNames.includes(name))

    const missingFromEnum = dbSectionNames.filter((name) => !enumSectionNames.includes(name as SectionNames))
    const missingFromDb = enumSectionNames.filter((name) => !dbSectionNames.includes(name))

    const eitherMissing = missingFromEnum.length > 0 || missingFromDb.length > 0

    if (eitherMissing) {
      const errorMessage = `SectionNames enum is out of sync with the assessment section tables:
      \t\tmissing from SectionNames enum: [${missingFromEnum.join(', ')}]
      \t\tmissing from db: [${missingFromDb.join(', ')}]`
      throw new Error(errorMessage)
    }
  })
