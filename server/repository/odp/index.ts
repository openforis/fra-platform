import { listAndValidateOriginalDataPoints } from '@server/repository/odp/listAndValidateOriginalDataPoints'
import { listOriginalDataPoints } from '@server/repository/odp/listOriginalDataPoints'
import { getOdp } from '@server/repository/odp/getOdp'
import { deleteDraft } from '@server/repository/odp/deleteDraft'
import { create } from '@server/repository/odp/create'
import { markAsActual } from '@server/repository/odp/markAsActual'
import { deleteOdp } from '@server/repository/odp/deleteOdp'
import { getOdpVersionId } from '@server/repository/odp/getOdpVersionId'
import { readEofOdps } from '@server/repository/odp/readEofOdps'
import { readFocOdps } from '@server/repository/odp/readFocOdps'
import { getDraftId } from '@server/repository/odp/getDraftId'

export const OdpRepository = {
  listAndValidateOriginalDataPoints,
  listOriginalDataPoints,
  getOdp,
  deleteDraft,
  create,
  markAsActual,
  deleteOdp,
  getOdpVersionId,
  readEofOdps,
  readFocOdps,
  getDraftId,
}
