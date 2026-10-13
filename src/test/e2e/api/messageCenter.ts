import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { type SectionName } from 'meta/assessment/section'
import { type MessageTopic, type MessageTopicType } from 'meta/messageCenter/messageTopic'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

export type TopicLocation = {
  countryIso: CountryIso
  key: string
  sectionName: SectionName
  type: MessageTopicType
}

const _getQueryParams = (location: TopicLocation): string => {
  const { countryIso, key, sectionName, type } = location
  return new URLSearchParams({ assessmentName, countryIso, cycleName, key, sectionName, type }).toString()
}

// Adds a message to the topic without going through the UI
const addMessage = async (page: Page, location: TopicLocation, message: string): Promise<void> => {
  const url = `${ApiEndPoint.MessageCenter.topicMessage()}?${_getQueryParams(location)}`
  const response = await page.request.post(url, { data: { message } })

  expect(response.ok(), `POST ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()
}

// Returns the topic the page loads when its comments open, so call this before opening them
const waitForTopic = async (page: Page): Promise<MessageTopic> => {
  const response = await page.waitForResponse((r) => {
    const isTopicPath = new URL(r.url()).pathname === ApiEndPoint.MessageCenter.topic()
    return isTopicPath && r.request().method() === 'GET'
  })

  expect(response.ok(), `GET ${response.url()} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  return response.json()
}

export const MessageCenterApi = {
  addMessage,
  waitForTopic,
}
