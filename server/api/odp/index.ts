import { Express } from 'express'
import { OdpCreateDraft } from '@server/api/odp/createDraft'
import { OdpDelete } from '@server/api/odp/delete'
import { OdpDeleteDraft } from '@server/api/odp/deleteDraft'
import { OdpGet } from '@server/api/odp/get'
import { OdpGetMany } from '@server/api/odp/getMany'
import { OdpGetPrevious } from '@server/api/odp/getPrevious'
import { OdpMarkAsActual } from '@server/api/odp/markAsActual'

export const OdpApi = {
  init: (express: Express): void => {
    OdpCreateDraft.init(express)
    OdpDelete.init(express)
    OdpDeleteDraft.init(express)
    OdpGet.init(express)
    OdpGetMany.init(express)
    OdpGetPrevious.init(express)
    OdpMarkAsActual.init(express)
  },
}
