import * as R from 'ramda'

import * as FraValueService from '../../../../eof/fraValueService'

import FraTableExporter from '../../exporter/fraTableExporter'

class ExtentOfForestExporter extends FraTableExporter {
  constructor() {
    super('extentOfForest', ['forestArea', 'otherWoodedLand', 'landArea'], '1a')
  }

  fetchData(countryIso: any) {
    return FraValueService.getFraValues(this.tableName, countryIso)
  }

  parseResultRow(result: any, yearIdx: any, year: any, countryConfig: any) {
    const eofYear = R.pipe(R.prop('fra'), R.find(R.propEq('year', year)), R.defaultTo({}))(result)

    return {
      // @ts-ignore
      forestArea: R.prop('forestArea', eofYear),
      // @ts-ignore
      otherWoodedLand: R.prop('otherWoodedLand', eofYear),
      landArea: R.path(['faoStat', year, 'area'], countryConfig),
    }
  }
}

const instance = new ExtentOfForestExporter()

export default instance
