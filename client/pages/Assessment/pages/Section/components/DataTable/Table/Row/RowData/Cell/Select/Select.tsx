import React from 'react'

// TODO Implement Select component

const Select = ({ datum }: { datum: string }) => {
  return <span>{datum}</span>
}

// import { ColType } from '@meta/assessment/col'
// import { useTranslation } from 'react-i18next'
// import { PropsCell } from '../props'
//
// const getOptionLabel = (option: ColOptionSpec, i18n: I18n, optionsLabelKeyPrefix: string): string => {
//   const { optionName } = option
//   const label = i18n.t(`${optionsLabelKeyPrefix}.${optionName}`)
//   return option.type === ColType.header ? `--- ${label} ---` : label
// }
//
// const optionNotSelected: ColOptionSpec = { optionName: 'notSelected', hidden: true }
//
// const Select: React.FC<PropsCell> = (props) => {
//
//   const { onChange, onPaste, col, datum, disabled } = props
//   const { options, optionsLabelKeyPrefix } = col.props
//   console.log(col.props)
//   const optionSelected = options.find((option) => option.optionName === datum)
//   const { i18n } = useTranslation()
//
//   if (disabled) {
//     return (
//       <div className="text-input__container">
//         <div className="text-input__readonly-view">
//           {datum && getOptionLabel(optionSelected, i18n, optionsLabelKeyPrefix)}
//         </div>
//       </div>
//     )
//   }
//
//   return (
//     <div className="fra-table__select-container">
//       <select
//         className="fra-table__select no-print"
//         value={datum || optionNotSelected.optionName}
//         disabled={disabled}
//         onChange={onChange}
//         onPaste={onPaste}
//       >
//         {[optionNotSelected, ...options].map((option) => {
//           const { hidden, optionName } = option
//           return (
//             <option key={optionName} value={optionName} disabled={option.type === TypeSpec.header} hidden={!!hidden}>
//               {getOptionLabel(option, i18n, optionsLabelKeyPrefix)}
//             </option>
//           )
//         })}
//       </select>
//       <div className="text-input__readonly-view only-print" style={{ textAlign: 'left' }}>
//         {datum && getOptionLabel(optionSelected, i18n, optionsLabelKeyPrefix)}
//       </div>
//     </div>
//   )
// }
//
export default Select
