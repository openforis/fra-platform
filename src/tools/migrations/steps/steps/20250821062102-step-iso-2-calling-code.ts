import * as fs from 'fs'
import * as path from 'path'
import * as pgPromise from 'pg-promise'
import { ITask } from 'pg-promise'
import { Promises } from 'utils/promises'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { DB, Schemas } from 'server/db'

const columns = ['country_iso', 'calling_code']
const pgp = pgPromise()

// Get calling codes and iso2
const getISOMapArray = (countryISOs: Array<string>): Array<Record<string, string>> => {
  const csvPath = path.join(__dirname, 'data', 'iso3-iso2-calling_code.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').slice(1)

  const map: Record<string, { iso2: string; callingCode: string }> = {}
  lines.forEach((line) => {
    if (line.trim()) {
      const columns = line.split(',')
      const iso3 = columns[0]
      const iso2 = columns[1]
      const callingCode = columns[2] || ''
      map[iso3] = { iso2, callingCode }
    }
  })

  return countryISOs.map((countryIso: string) => ({
    country_iso: countryIso,
    calling_code: map[countryIso]?.callingCode,
  }))
}

const _updateDDL = async (allCycles: Array<{ assessment: Assessment; cycle: Cycle }>): Promise<void> => {
  // Update public.country table
  await DB.none(`alter table public.country add column if not exists calling_code varchar(10)`)
  // Update cycle.country tables
  await Promise.all(
    allCycles.map(({ assessment, cycle }) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      return Promise.all([
        DB.none(`alter table ${schemaName}.country add column if not exists calling_code varchar(10)`),
      ])
    })
  )
}

type UpdateProps = { schema: string; countryIsoMap: Array<Record<string, string>> }

const _update = async (props: UpdateProps, client: ITask<unknown>): Promise<void> => {
  const { countryIsoMap, schema } = props

  const publicCs = new pgp.helpers.ColumnSet(columns, { table: { table: 'country', schema } })
  const publicQuery = `${pgp.helpers.update(countryIsoMap, publicCs)} WHERE v.country_iso = t.country_iso`
  await client.none(publicQuery)
}

export default async (): Promise<void> => {
  await DB.tx(async (client) => {
    const assessments = await AssessmentController.getAll({}, client)
    const allCycles = assessments.flatMap((assessment) => assessment.cycles.map((cycle) => ({ assessment, cycle })))

    // update ddl
    await _updateDDL(allCycles)

    const countryISOs = await client.map(`select country_iso from public.country`, [], (row) => row.country_iso)
    const countryIsoMap = getISOMapArray(countryISOs)

    // update public
    await _update({ schema: 'public', countryIsoMap }, client)

    // update cycles
    await Promise.all(
      allCycles.map(async ({ assessment, cycle }) => {
        const schema = Schemas.getNameCycle(assessment, cycle)
        return _update({ schema, countryIsoMap }, client)
      })
    )

    await Promises.each(allCycles, async ({ assessment, cycle }) => {
      await CacheController.generateArea({ assessment, cycle }, client)
    })
  })
}
