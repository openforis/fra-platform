import TextSelectType from './textSelectType'

export default (cellSpec) => {
  const yesNoCellspecAttributes = {
    localizationPrefix: 'yesNoTextSelect',
    options: [
      {name: 'yes'},
      {name: 'no'}
    ]
  }
  return TextSelectType({cellSpec, ...yesNoCellspecAttributes})
}
