// Table data stress test: simulates people editing table cells at the same time.
// Each simulated user edits a cell, pauses like a person would, and repeats, while a canary
// reads the same data and its validations at a fixed rate. See README.md.
import { sleep } from 'k6'

import { getToken } from '../auth.ts'
import { countries, duration, users } from '../config.ts'
import { randomInt } from '../random.ts'
import { editTableCells } from './editTableCells.ts'
import { getTableData } from './getTableData.ts'

const pauseMinSeconds = 5
const pauseMaxSeconds = 15
const canaryReadsPerSecond = 2

export const options = {
  noVUConnectionReuse: true, // Use a fresh connection per action
  scenarios: {
    writers: {
      duration,
      exec: 'write',
      executor: 'constant-vus',
      vus: users,
    },
    canary: {
      duration,
      exec: 'read',
      executor: 'constant-arrival-rate',
      preAllocatedVUs: 10,
      rate: canaryReadsPerSecond,
      timeUnit: '1s',
    },
  },
  // more than 1% of requests failing (HTTP >= 400 or network error) fails the run.
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
}

export const setup = (): { token: string } => ({ token: getToken() })

// Edits one of the cells, then pauses like a person would, and repeats
export const write = (data: { token: string }): void => {
  const headers = { 'Content-Type': 'application/json', Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[__VU % countries.length] // spreads simulated users across countries
  editTableCells(headers, countryIso)
  sleep(randomInt(pauseMinSeconds, pauseMaxSeconds))
}

export const read = (data: { token: string }): void => {
  const headers = { Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[randomInt(0, countries.length - 1)]
  getTableData(headers, countryIso)
}
