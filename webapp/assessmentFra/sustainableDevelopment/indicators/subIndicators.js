import React from 'react'

import SubIndicator1 from './subIndicator1'
import SubIndicator2 from './subIndicator2'
import SubIndicator3 from './subIndicator3'
import SubIndicator4 from './subIndicator4'

const SubIndicators = ({i18n, countryIso, data, countryConfig, years}) => {

  return <div>
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('sustainableDevelopment.sdgIndicator15_2_1')}</h3>
    </div>
    <SubIndicator1
      i18n={i18n}
      countryIso={countryIso}
      data={data}
      years={years}
    />
    <SubIndicator2
      i18n={i18n}
      countryIso={countryIso}
      data={data}
      years={years}
    />
    <SubIndicator3
      i18n={i18n}
      countryIso={countryIso}
      data={data}
      years={years}
    />
    <SubIndicator4
      i18n={i18n}
      countryIso={countryIso}
      data={data}
      years={years}
      countryConfig={countryConfig}
    />
  </div>
}

export default SubIndicators
