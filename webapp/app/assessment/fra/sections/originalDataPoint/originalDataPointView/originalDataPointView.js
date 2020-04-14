import './originalDataPointView.less'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { batchActions } from '@webapp/main/reduxBatch'

import { useCountryIso, useI18n } from '@webapp/components/hooks'

import * as CountryState from '@webapp/app/country/countryState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'

import ButtonBar from './components/buttonBar'
import YearSelection from './components/yearSelection'
import DataSources from './components/dataSources'
// import NationalClasses from './components/nationalClasses'
// import OriginalData from './components/originalData/originalData'
import Comments from './components/comments'

import * as OriginalDataPointState from '../originalDataPointState'
import { fetch, clearActive } from '../actions'

const OriginalDataPointView = () => {
  const dispatch = useDispatch()
  const { odpId } = useParams()
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const odp = useSelector(OriginalDataPointState.getActiveOriginalDataPoint)
  const canEditData = useSelector((state) => CountryState.getCanEditData(state) && !FraState.isLocked(state))

  useEffect(() => {
    dispatch(fetch(odpId, countryIso))
    return () => {
      dispatch(batchActions([fetchCountryOverviewStatus(countryIso), clearActive()]))
    }
  }, [])

  if (!odp) {
    return null
  }

  return (
    <div className="app-view__content">
      <div className="app-view__page-header">
        <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        <ButtonBar canEditData={canEditData} odp={odp} />
      </div>

      <YearSelection canEditData={canEditData} odp={odp} />
      <DataSources canEditData={canEditData} odp={odp} />

      {/* <NationalClasses {...props} /> */}

      {/* <OriginalData {...props} /> */}

      <Comments canEditData={canEditData} odp={odp} />

      <div className="odp__bottom-buttons">
        <ButtonBar canEditData={canEditData} odp={odp} />
      </div>
    </div>
  )
}

export default OriginalDataPointView

// class OriginalDataPointView extends React.Component {
//   componentDidMount() {
//     const odpId = R.defaultTo(null, this.props.match.params.odpId)
//     this.props.fetch(odpId, this.props.match.params.countryIso)
//     // TODO this requires passing in target array containing odpId as well
//     // also requires server-side support in the API to handle the target-array
//     // this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, 'odp')
//   }
//
//   componentWillUnmount() {
//     this.props.fetchCountryOverviewStatus(this.props.match.params.countryIso)
//     this.props.clearActive()
//   }
//
//   render() {
//     return (
//       <>
//         {this.props.odp && (
//           <OriginalDataPoint
//             years={years}
//             copyDisabled={R.or(
//               R.not(ODP.allowCopyingOfPreviousValues(this.props.odp)),
//               R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props)))
//             )}
//             {...this.props}
//           />
//         )}
//       </>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   const openThread = ReviewState.getOpenThread(state)
//   const countryConfig = CountryState.getConfig(state)
//
//   const useOriginalDataPointsInFoc = !!countryConfig.useOriginalDataPointsInFoc
//
//   return {
//     ...state.originalDataPoint,
//     openThread,
//     useOriginalDataPointsInFoc,
//   }
// }
//
// export default connect(mapStateToProps, {
//   fetch,
//   clearActive,
//   copyPreviousNationalClasses,
//   fetchCountryOverviewStatus,
//   fetchLastSectionUpdateTimestamp,
// })(OriginalDataPointView)
