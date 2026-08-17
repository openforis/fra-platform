import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { AuthToken } from 'meta/auth/token'

import { config } from '../config'

const requestTimeoutMs = 30_000

export interface StressClient {
  request: (requestConfig: AxiosRequestConfig) => Promise<AxiosResponse | null>
}

export interface CycleRequestParams {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
}

export const cycleParams = (countryIso: CountryIso): CycleRequestParams => ({
  assessmentName: config.assessmentName,
  countryIso,
  cycleName: config.cycleName,
})

export const login = async (appUri: string, email: string, password: string): Promise<string> => {
  const url = `${appUri}${ApiEndPoint.Auth.login()}`
  const response = await axios.post(url, { email, password })
  const setCookie: Array<string> = response.headers['set-cookie'] ?? []
  const authCookie = setCookie.find((cookie) => cookie.startsWith(`${AuthToken.fraAuthToken}=`))
  if (!authCookie) throw new Error(`login response from ${url} did not set the ${AuthToken.fraAuthToken} cookie`)
  return authCookie.split(';')[0]
}

export const createClient = (appUri: string, cookie: string): StressClient => {
  const instance: AxiosInstance = axios.create({
    baseURL: appUri,
    headers: { Cookie: cookie },
    timeout: requestTimeoutMs,
  })

  const request = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse | null> => {
    try {
      return await instance.request(requestConfig)
    } catch {
      return null
    }
  }

  return { request }
}
