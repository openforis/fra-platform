// National data point stress test: simulates people editing existing NDPs at the same time.
// Each simulated user edits an NDP, pauses like a person would, and repeats, while a canary
// reads the same NDPs and their validations at a fixed rate. See README.md.
import { sleep } from 'k6'
import http from 'k6/http'

import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { getToken } from '../auth.ts'
import { baseUrl, countries, cycleParams, duration, users } from '../config.ts'
import { randomInt } from '../random.ts'
import { editNdp } from './editNdp.ts'
import { getNdp } from './getNdp.ts'

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
    const ndps = response.json() as Array<OriginalDataPoint>
    if (ndps.length === 0) throw new Error(`${countryIso} has no national data points to edit`)
    ndpsByCountry[countryIso] = ndps
  })
  return { ndpsByCountry, token }
}

// Edits one of the existing NDPs, then pauses like a person would, and repeats
export const write = (data: SetupData): void => {
  const headers = { 'Content-Type': 'application/json', Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[__VU % countries.length] // spreads simulated users across countries
  editNdp(headers, countryIso, data.ndpsByCountry[countryIso])
  sleep(randomInt(pauseMinSeconds, pauseMaxSeconds))
}

export const read = (data: SetupData): void => {
  const headers = { Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[randomInt(0, countries.length - 1)]
  getNdp(headers, countryIso, data.ndpsByCountry[countryIso])
}
