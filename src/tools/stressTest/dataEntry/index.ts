// Data entry stress test: simulates people editing the target countries at the same time.
// Each simulated user picks one action, performs the same requests the UI would send,
// then pauses like a person would, and repeats. See README.md.

import { sleep } from 'k6'
import http from 'k6/http'

import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { getToken } from '../auth.ts'
import { baseUrl, countries, cycleParams, duration, users } from '../config.ts'
import { editNdp } from './editNdp.ts'
import { editTableCells } from './editTableCells.ts'
import { getTableData } from './getTableData.ts'
import { getValidationSummary } from './getValidationSummary.ts'
import { randomInt } from './random.ts'

const pauseMinSeconds = 5
const pauseMaxSeconds = 15

// Action weights in %.
const getValidationSummaryWeight = 5 // 5% of actions get the validation summary
const getTableDataWeight = 30 // 30% of actions GET table data and its validations
const editTableCellsWeight = 55 // 55% of actions edit table cells
// editNdp gets the remainder (10%)

export const options = {
  scenarios: {
    users: {
      duration,
      exec: 'user',
      executor: 'constant-vus',
      vus: users,
    },
  },
  // more than 1% of requests failing (HTTP >= 400 or network error) fails the run.
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
}

interface SetupData {
  ndpsByCountry: Record<string, Array<OriginalDataPoint>>
  token: string
}

export const setup = (): SetupData => {
  const token = getToken()
  const headers = { Cookie: `fra-auth-token=${token}` }

  const ndpsByCountry: Record<string, Array<OriginalDataPoint>> = {}
  countries.forEach((countryIso) => {
    const response = http.get(`${baseUrl}/api/cycle-data/national-data-points?${cycleParams(countryIso)}`, { headers })
    if (response.status !== 200) throw new Error(`could not list national data points of ${countryIso}`)
    ndpsByCountry[countryIso] = response.json() as Array<OriginalDataPoint>
  })
  return { ndpsByCountry, token }
}

export const user = (data: SetupData): void => {
  const headers = { 'Content-Type': 'application/json', Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[__VU % countries.length] // spreads simulated users across countries
  const ndps = data.ndpsByCountry[countryIso] || []

  const roll = randomInt(1, 100)
  if (roll <= getValidationSummaryWeight) {
    getValidationSummary(headers, countryIso)
  } else if (roll <= getValidationSummaryWeight + getTableDataWeight) {
    getTableData(headers, countryIso)
  } else if (roll <= getValidationSummaryWeight + getTableDataWeight + editTableCellsWeight || ndps.length === 0) {
    editTableCells(headers, countryIso)
  } else {
    editNdp(headers, countryIso, ndps)
  }

  sleep(randomInt(pauseMinSeconds, pauseMaxSeconds))
}
