import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user/role/name'

import { MailUtil } from 'test/e2e/utils/Mail'
import { type TestUserData } from 'test/e2e/utils/User'

export type InviteSeed = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  role: RoleName
  testUser: TestUserData
}

const _getQueryParams = (props: Pick<InviteSeed, 'assessmentName' | 'countryIso' | 'cycleName'>): string => {
  const { assessmentName, countryIso, cycleName } = props
  return new URLSearchParams({ assessmentName, countryIso, cycleName }).toString()
}

const create = async (page: Page, seed: InviteSeed): Promise<string> => {
  const { assessmentName, countryIso, cycleName, role, testUser } = seed
  const { email, name, surname } = testUser

  const query = _getQueryParams({ assessmentName, countryIso, cycleName })
  const url = `${ApiEndPoint.User.invite()}?${query}`

  const response = await page.request.post(url, {
    multipart: { email, language: Lang.en, name, role, surname },
  })

  expect(response.ok(), `POST ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  return MailUtil.getInvitationLink(email)
}

export const InviteApiUtils = {
  create,
}
