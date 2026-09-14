import { NextFunction, Request, Response } from 'express'

import { Areas } from 'meta/area/areas'
import { Global } from 'meta/area/global'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { Lang, LanguageCodes } from 'meta/lang'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'
import { UUIDs } from 'meta/uuid/uuids'
import { Numbers } from 'utils/numbers'

export type InvalidQueryParamError = Error & { statusCode: number }

const _getInvalidQueryParamError = (paramName: string, value: string): InvalidQueryParamError => {
  const error = new Error(`Invalid ${paramName}: ${value}`) as InvalidQueryParamError
  error.name = 'InvalidQueryParamError'
  error.statusCode = 400
  return error
}

const _isBoolean = (value: string): boolean => value === 'true' || value === 'false'

// TODO:
// filters
// orderBy, key
// OTHER:
// variables, tableNames, tableName, name,
// columns, topicKey, query, paths,
// linkedVariable, fileName

const assessmentNames = Object.values(AssessmentNames)
const cycleNames = Object.values(CycleNames)
const sectionNames = Object.values(SectionNames)
const messageTopicTypes = Object.values(MessageTopicType)
const orderByDirections = Object.values(TablePaginatedOrderByDirection)

const validators: Record<string, (value: string | Array<string>) => boolean> = {
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
  sectionName: (value) => sectionNames.includes(value as SectionNames),
  sectionNames: (value) => Array.isArray(value) && value.every((name) => sectionNames.includes(name as SectionNames)),
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

const _validateParam = (params: Record<string, string | Array<string>>, paramName: string): void => {
  const validate = validators[paramName]
  const value = params[paramName]
  if (value === undefined) return

  if (!validate(value)) {
    throw _getInvalidQueryParamError(paramName, value.toString())
  }
}

export const validateQueryParams = (req: Request, _: Response, next: NextFunction): void => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as Record<string, string | Array<string>>
    Object.keys(validators).forEach((paramName) => _validateParam(params, paramName))
    next()
  } catch (error) {
    next(error)
  }
}
