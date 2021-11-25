import * as R from 'ramda'

import { CountryService } from '@server/controller'
import FraTableExporter from './fraTableExporter'

class CountryConfigExporter extends FraTableExporter {
  constructor() {
    super('', ['boreal', 'temperate', 'tropical', 'subtropical'])
  }

  fetchData(countryIso: any) {
    return CountryService.getCountryConfigFull(countryIso)
  }

  parseResultRow(result: any) {
    return {
      boreal: R.path(['climaticDomainPercents', 'boreal'], result),
      temperate: R.path(['climaticDomainPercents', 'temperate'], result),
      tropical: R.path(['climaticDomainPercents', 'tropical'], result),
      subtropical: R.path(['climaticDomainPercents', 'subtropical'], result),
    }
  }
}

const instance = new CountryConfigExporter()

export default instance
