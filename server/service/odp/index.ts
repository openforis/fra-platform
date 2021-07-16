import { listAndValidateOriginalDataPoints } from './listAndValidateOriginalDataPoints'
import { listOriginalDataPoints } from './listOriginalDataPoints'
import { getOdp } from './getOdp'
import { deleteDraft } from './deleteDraft'
import { persistDraft } from './persistDraft'
import { create } from './create'
import { markAsActual } from './markAsActual'
import { deleteOdp } from './deleteOdp'
import { getOdpVersionId } from './getOdpVersionId'
import { readEofOdps } from './readEofOdps'
import { readFocOdps } from './readFocOdps'

export const OdpService = {
  listAndValidateOriginalDataPoints,
  listOriginalDataPoints,
  getOdp,
  deleteDraft,
  persistDraft,
  create,
  markAsActual,
  deleteOdp,
  getOdpVersionId,
  readEofOdps,
  readFocOdps,
}
