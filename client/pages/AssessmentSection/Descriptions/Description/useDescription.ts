import { useEffect } from 'react'

import { ApiEndPoint } from '@common/api/endpoint'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso, useGetRequest } from '@client/hooks'

type DescriptionState = {
  loading: boolean
  onChange: (value: string) => void
  value: string
}
// export default (_name: string, _section: string, _template: string): DescriptionState => ({
//   loading: false,
//   onChange: (_value: string) => {
//     // TODO
//   },
//   value: undefined,
// })
// TODO
export default (name: string, section: string, template: string): DescriptionState => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  // const canPostData = useRef(false)
  const url = ApiEndPoint.Assessment.Data.descriptions()

  // ====== data read
  const {
    data = template || null,
    // setState,
    // loading,
    dispatch: fetchData,
  } = useGetRequest(url, {
    params: {
      countryIso,
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      sectionName: section,
      name,
    },
  })

  // ====== data update
  // const { dispatch: postData, loaded: postDataLoaded } = usePostRequest(url, { content: data })

  // const onChange = (content: string) => {
  // dispatch(AutosaveActions.autoSaveStart())
  // canPostData.current = true
  // setState({ data: content })
  // }

  // on mount fetch data
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryIso, section])

  // on value update if canPostData is true, executes post request
  // useEffect(() => {
  //   if (canPostData.current) {
  //     Functions.debounce(postData, 800)
  //   }
  // }, [data])

  // on post data loaded, dispatch autosave complete
  // useOnUpdate(() => {
  // dispatch(AutosaveActions.autoSaveComplete())
  // }, [postDataLoaded])
  //

  return {
    value: data?.content,
    onChange: (_value: string) => {
      // TODO
    },
    loading: false,
  }
}
