import { Areas } from 'meta/area/areas'
import { Global } from 'meta/area/global'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Lang, LanguageCodes } from 'meta/lang'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'
import { UUIDs } from 'meta/uuid/uuids'
import { Numbers } from 'utils/numbers'

import { _areSectionNames } from 'server/middleware/apiContext/validateQueryParams/_areSectionNames'
import { _isBoolean } from 'server/middleware/apiContext/validateQueryParams/_isBoolean'

// TODO:
// variables, tableNames, tableName

type Validate = (
  value: string | Array<string>,
  params: Record<string, string | Array<string>>
) => boolean | Promise<boolean>

const assessmentNames = Object.values(AssessmentNames)
const cycleNames = Object.values(CycleNames)
const messageTopicTypes = Object.values(MessageTopicType)
const orderByDirections = Object.values(TablePaginatedOrderByDirection)

export const validators: Record<string, Validate> = {
  // assessmentName and cycleName
  assessmentName: (value) => assessmentNames.includes(value as AssessmentNames),
  cycleName: (value) => cycleNames.includes(value as CycleNames),
  // countryISOs and regionCode
  countryISOs: (value) => Array.isArray(value) && value.every((countryIso) => Areas.isISOCountry(countryIso)),
  countryIso: (value) => Areas.isISOCountry(value as string),
  regionCode: (value) => Areas.isRegion(value as string) || Areas.isGlobal(value as Global),
  areaCode: (value) => Areas.isAreaCode(value as string),
  // tablePaginated
  limit: (value) => Numbers.isNonNegativeInteger(value as string),
  offset: (value) => Numbers.isNonNegativeInteger(value as string),
  // lang
  lang: (value) => LanguageCodes.includes(value as Lang),
  // sectionName and sectionNames
  sectionName: async (value, params) => _areSectionNames([value as string], params),
  sectionNames: async (value, params) => Array.isArray(value) && _areSectionNames(value, params),
  // year
  year: (value) => {
    const parsed = Numbers.toNumberOrNull(value as string)
    // not null, must be integer and between 1900 and current year + 1
    return parsed !== null && Number.isInteger(parsed) && Numbers.between(parsed, 1900, new Date().getFullYear() + 1)
  },
  // uuids
  uuid: (value) => UUIDs.isUuid(value as string),
  invitationUuid: (value) => UUIDs.isUuid(value as string),
  userUuid: (value) => UUIDs.isUuid(value as string),
  resetPasswordUuid: (value) => UUIDs.isUuid(value as string),
  // ids
  odpId: (value) => Numbers.isNonNegativeInteger(value as string),
  index: (value) => Numbers.isNonNegativeInteger(value as string),
  id: (value) => Numbers.isNonNegativeInteger(value as string),
  messageId: (value) => Numbers.isNonNegativeInteger(value as string),
  // booleans
  notifyUsers: (value) => _isBoolean(value as string),
  notifySelf: (value) => _isBoolean(value as string),
  mergeOdp: (value) => _isBoolean(value as string),
  onlyTables: (value) => _isBoolean(value as string),
  force: (value) => _isBoolean(value as string),
  global: (value) => _isBoolean(value as string),
  // small fixed-set enums
  type: (value) => messageTopicTypes.includes(value as MessageTopicType),
  orderByDirection: (value) => orderByDirections.includes(value as TablePaginatedOrderByDirection),
}
