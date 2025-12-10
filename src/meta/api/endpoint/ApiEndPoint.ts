import { apiPath, joinPaths } from 'meta/api/endpoint/_utils'
import { Admin } from 'meta/api/endpoint/admin'
import { Area } from 'meta/api/endpoint/area'
import { Auth } from 'meta/api/endpoint/auth'
import { CycleData } from 'meta/api/endpoint/cycleData'
import { Explorer } from 'meta/api/endpoint/explorer'
import { ExtData } from 'meta/api/endpoint/extData'
import { File } from 'meta/api/endpoint/file'
import { Geo } from 'meta/api/endpoint/geo'
import { Kiosk } from 'meta/api/endpoint/kiosk'
import { _Legacy } from 'meta/api/endpoint/legacy'
import { MessageCenter } from 'meta/api/endpoint/messageCenter'
import { MetaData } from 'meta/api/endpoint/metaData'
import { Static } from 'meta/api/endpoint/static'
import { User } from 'meta/api/endpoint/user'

export const ApiEndPoint = {
  definitions: (lang = ':lang', name = ':name', assessmentName = ':assessmentName', cycleName = ':cycleName'): string =>
    joinPaths('definitions', assessmentName, cycleName, lang, name),
  health: (): string => apiPath('health'),
  init: (): string => apiPath('init'),

  Admin,
  Area,
  Auth,
  CycleData,
  Explorer,
  ExtData,
  File,
  Geo,
  Kiosk,
  MessageCenter,
  MetaData,
  Static,
  User,
  _Legacy,
}
