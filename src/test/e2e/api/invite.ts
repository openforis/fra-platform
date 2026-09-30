import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user/role/name'
import { UserContactPreferenceMethod } from 'meta/user/role/props'

import { MailUtil } from 'test/e2e/utils/Mail'
import { type TestUserData } from 'test/e2e/utils/User'

export type InviteSeed = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  role: RoleName
  testUser: TestUserData
}

export type AcceptSeed = {
  invitationPath: string
  testUser: TestUserData
}

const defaultRoleProps = {
  'role.props.address.city': 'Helsinki',
  'role.props.address.countryIso': 'FIN' satisfies CountryIso,
  'role.props.address.street': 'Test Street 1',
  'role.props.address.zipCode': '00100',
  'role.props.contactPreference.method': UserContactPreferenceMethod.primaryEmail,
  'role.props.organization': 'Test Organization',
  'role.props.primaryPhoneNumber': '123456789',
  'user.props.title': 'Mr.',
}

const _getInvitationUuid = (invitationPath: string): string => {
  const [, query = ''] = invitationPath.split('?')
  const invitationUuid = new URLSearchParams(query).get('invitationUuid')
  if (!invitationUuid) throw new Error(`No invitationUuid found in path: ${invitationPath}`)
  return invitationUuid
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

// Register and accept
const accept = async (page: Page, seed: AcceptSeed): Promise<void> => {
  const { invitationPath, testUser } = seed
  const { email, password } = testUser
  const invitationUuid = _getInvitationUuid(invitationPath)

  const registerResponse = await page.request.post(ApiEndPoint.Auth.login(), {
    multipart: { email, invitationUuid, password, password2: password },
  })
  expect(
    registerResponse.ok(),
    `Register failed: ${registerResponse.status()} ${await registerResponse.text()}`
  ).toBeTruthy()

  const acceptUrl = `${ApiEndPoint.User.invitationAccept()}?${new URLSearchParams({ invitationUuid }).toString()}`
  const acceptResponse = await page.request.post(acceptUrl, { multipart: defaultRoleProps })
  expect(acceptResponse.ok(), `Accept failed: ${acceptResponse.status()} ${await acceptResponse.text()}`).toBeTruthy()
}

export const InviteApi = {
  accept,
  create,
}
