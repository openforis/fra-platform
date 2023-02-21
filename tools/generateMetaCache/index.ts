import * as path from "path";
import { config } from "dotenv";

import { Assessment, Cycle } from "../../src/meta/assessment";
import { DB } from "../../src/server/db";
import { Objects } from "../../src/utils";
import { generateMetaCache } from "../dataMigration/generateMetaCache";

config({ path: path.resolve(__dirname, '..', '..', '.env') })

const client = DB

const _generateMetaCache = async () => {
  const assessments = await client.map<Assessment>(`select * from assessment a`, [], (assessment) => ({
    ...Objects.camelize(assessment),
    metaCache: assessment.meta_cache,
  }))

  for (let i = 0; i < assessments.length; i += 1) {
    const assessment = assessments[i]
    console.debug(`\t---- Generating meta cache for assessment ${assessment.props.name}`)
    // eslint-disable-next-line no-await-in-loop
    const cycles = await client.many<Cycle>(
      `
    select * from assessment_cycle ac where ac.assessment_id = $1`,
      [assessment.id]
    )

    for (let i = 0; i < cycles.length; i += 1) {
      const cycle = cycles[i]
      console.debug(`\t\t----\tGenerating meta cache for cycle ${cycle.name}`)
      // eslint-disable-next-line no-await-in-loop
      await generateMetaCache(
        {
          assessment,
          cycle,
        },
        client
      )
    }
  }
}

_generateMetaCache()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
