type DescriptionState = {
  loading: boolean
  onChange: (value: string) => void
  value: string
}
export default (name: string, section: string, template: string): DescriptionState => ({
  loading: false,
  onChange: (value: string) => console.log('todo', value),
  value: undefined,
})
// TODO
// export default (name: string, section: string, template: string): DescriptionState => {
// const countryIso = useCountryIso()
// const canPostData = useRef(false)
// const url = `/api/country/descriptions/${countryIso}/${section}/${name}`

// ====== data read
// const { data = template || null, setState, loading, dispatch: fetchData } = useGetRequest(url)

// ====== data update
// const { dispatch: postData, loaded: postDataLoaded } = usePostRequest(url, { content: data })

// const onChange = (content: string) => {
// dispatch(AutosaveActions.autoSaveStart())
// canPostData.current = true
// setState({ data: content })
// }

// on mount fetch data
// useEffect(fetchData, [section, countryIso])

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
//   return {
//     value: null, // data,
//     onChange,
//     loading: false,
//   }
// }
