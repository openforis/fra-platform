import { getAreas } from 'client/store/area/actions/getAreas'
import { setCountry } from 'client/store/area/actions/setCountry'
import { updateCountry } from 'client/store/area/actions/updateCountry'
import { updateCountryProp } from 'client/store/area/actions/updateCountryProp'

export const AreaActions = {
  getAreas,
  updateCountry,
  updateCountryProp,
  setCountry,
}
