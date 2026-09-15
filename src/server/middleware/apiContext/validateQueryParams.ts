import { NextFunction, Request, Response } from 'express'

import { Areas } from 'meta/area/areas'
import { Global } from 'meta/area/global'
import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { Lang, LanguageCodes } from 'meta/lang'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'
import { UUIDs } from 'meta/uuid/uuids'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { SectionRedisRepository } from 'server/cache/repository/section'
import { AssessmentController } from 'server/controller/assessment'

type InvalidQueryParamError = Error & { statusCode: number }

const _getInvalidQueryParamError = (paramName: string, value: string): InvalidQueryParamError => {
  const error = new Error(`Invalid ${paramName}: ${value}`) as InvalidQueryParamError
  error.name = 'InvalidQueryParamError'
  error.statusCode = 400
  return error
}

const _isBoolean = (value: string): boolean => value === 'true' || value === 'false'

// TODO:
// variables, tableNames, tableName

const assessmentNames = Object.values(AssessmentNames)
const cycleNames = Object.values(CycleNames)
const messageTopicTypes = Object.values(MessageTopicType)
const orderByDirections = Object.values(TablePaginatedOrderByDirection)
const customSectionNames = Object.values(SectionNames)

const _validSectionNames: Record<AssessmentName, Record<CycleName, Array<string>>> = {}

const _getValidSectionNames = async (params: Record<string, string | Array<string>>): Promise<Array<string>> => {
  const { assessmentName, cycleName } = params as { assessmentName?: AssessmentName; cycleName?: CycleName }
  if (!assessmentName || !cycleName) return customSectionNames

  const cached = Objects.getInPath(_validSectionNames, [assessmentName, cycleName])
  if (cached) return cached

  // cache if not found
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const validSectionNames = await SectionRedisRepository.getSectionNames({ assessment, cycle })
  const allValidNames = [...customSectionNames, ...validSectionNames]

  Objects.setInPath({ obj: _validSectionNames, path: [assessmentName, cycleName], value: allValidNames })

  return allValidNames
}

const _areSectionNames = async (
  values: Array<string>,
  params: Record<string, string | Array<string>>
): Promise<boolean> => {
  const validSectionNames = await _getValidSectionNames(params)
  return values.every((value) => validSectionNames.includes(value))
}

type Validate = (
  value: string | Array<string>,
  params: Record<string, string | Array<string>>
) => boolean | Promise<boolean>

const validators: Record<string, Validate> = {
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

const _validateParam = async (paramName: string, params: Record<string, string | Array<string>>): Promise<void> => {
  const validate = validators[paramName]
  const value = params[paramName]
  if (value === undefined) return

  const isValid = await validate(value, params)
  if (!isValid) {
    throw _getInvalidQueryParamError(paramName, value.toString())
  }
}

export const validateQueryParams = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as Record<string, string | Array<string>>
    await Promises.each(Object.keys(validators), (paramName) => _validateParam(paramName, params))
    next()
  } catch (error) {
    next(error)
  }
}
