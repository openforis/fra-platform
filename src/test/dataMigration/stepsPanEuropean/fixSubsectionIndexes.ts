import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
}

const sectionsToFix: Array<string> = [
  'treeSpeciesComposition',
  'totalForestAreaByExpansionAndRegenerationType',
  'annualForestExpansionAndRegeneration',
  'naturalness',
  'naturalnessBySubclasses',
  'introducedTreeSpecies',
  'introducedTreeSpecies4_4b',
  'invasiveTreeSpecies',
  'deadwood',
  'threatenedForestSpecies',
  'protectedForests',
]

export const fixSubsectionIndexes = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const schemaAssessment = Schemas.getName(assessment)

  try {
    await client.query(
      sectionsToFix.map(
        (name, index) => `
        update ${schemaAssessment}.section
        set props = jsonb_set(props,'{index}','${index}')
        where props->>'name'='${name}';  
      `
      ).join(`;
      `)
    )
  } catch (err) {
    Logger.error(`An error occurred when executing the query: ${err}`)
  }
}
