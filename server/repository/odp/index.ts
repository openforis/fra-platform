import { listAndValidateOriginalDataPoints } from '@server/repository/odp/listAndValidateOriginalDataPoints'
import { listOriginalDataPoints } from '@server/repository/odp/listOriginalDataPoints'
import { getOdp } from '@server/repository/odp/getOdp'
import { deleteDraft } from '@server/repository/odp/deleteDraft'
import { saveDraft } from '@server/repository/odp/saveDraft'
import { createOdp } from '@server/repository/odp/createOdp'
import { markAsActual } from '@server/repository/odp/markAsActual'
import { deleteOdp } from '@server/repository/odp/deleteOdp'
import { getOdpVersionId } from '@server/repository/odp/getOdpVersionId'
import { readEofOdps } from '@server/repository/odp/readEofOdps'
import { readFocOdps } from '@server/repository/odp/readFocOdps'

export const OdpRepository = {
  listAndValidateOriginalDataPoints,
  listOriginalDataPoints,
  getOdp,
  deleteDraft,
  saveDraft,
  createOdp,
  markAsActual,
  deleteOdp,
  getOdpVersionId,
  readEofOdps,
  readFocOdps,
}
