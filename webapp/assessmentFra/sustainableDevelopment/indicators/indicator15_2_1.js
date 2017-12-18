import React from 'react'

import Indicator15_2_1_1 from './indicator15_2_1_1'
import Indicator15_2_1_2 from './indicator15_2_1_2'

const Indicator15_2_1 = ({i18n, countryIso, data, years}) => {

  return <div>
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('sustainableDevelopment.sdgIndicator15_2_1')}</h3>
    </div>
    <Indicator15_2_1_1
      i18n={i18n}
      countryIso={countryIso}
      data={data}
      years={years}
    />
    <Indicator15_2_1_2
      i18n={i18n}
      countryIso={countryIso}
      data={data}
      years={years}
    />
  </div>
}

export default Indicator15_2_1
