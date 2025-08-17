import { getLayerMapId } from 'client/store/geo/layers/actions/getLayerMapId'
import { resetAllLayersStatus } from 'client/store/geo/layers/actions/resetAllLayersStatus'
import { setAgreementProperty } from 'client/store/geo/layers/actions/setAgreementProperty'
import { setOpacity } from 'client/store/geo/layers/actions/setOpacity'
import { setOptionsProperty } from 'client/store/geo/layers/actions/setOptionsProperty'
import { setProperty } from 'client/store/geo/layers/actions/setProperty'
import { setSectionGlobalOpacity } from 'client/store/geo/layers/actions/setSectionGlobalOpacity'
import { toggleLayer } from 'client/store/geo/layers/actions/toggleLayer'

export const LayersActions = {
  getLayerMapId,
  resetAllLayersStatus,
  setAgreementProperty,
  setOpacity,
  setOptionsProperty,
  setProperty,
  setSectionGlobalOpacity,
  toggleLayer,
}
