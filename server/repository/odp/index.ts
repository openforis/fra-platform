import { listOriginalDataPoints } from '@server/repository/odp/listOriginalDataPoints'
import { getOdp } from '@server/repository/odp/getOdp'
import { create } from '@server/repository/odp/create'
import { markAsActual } from '@server/repository/odp/markAsActual'
import { deleteOdp } from '@server/repository/odp/deleteOdp'
import { getOdpVersionId } from '@server/repository/odp/getOdpVersionId'
import { readEofOdps } from '@server/repository/odp/readEofOdps'
import { readFocOdps } from '@server/repository/odp/readFocOdps'
import { getDraftId } from '@server/repository/odp/getDraftId'
import { updateDraftId } from '@server/repository/odp/updateDraftId'
import { readActualId } from '@server/repository/odp/getActualId'

export const OdpRepository = {
  listOriginalDataPoints,
  getOdp,
  create,
  deleteOdp,
  readEofOdps,
  readFocOdps,

  getOdpVersionId,

  markAsActual,
  getDraftId,
  updateDraftId,

  readActualId,
}
