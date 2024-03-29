import React from 'react'
import * as R from 'ramda'
import { assessments } from '@common/assessmentSectionItems'

const optionAll = { tableNo: 'all', section: 'all', label: 'contactPersons.all' }
const optionNone = { tableNo: 'none', section: 'none', label: 'contactPersons.none' }

const optionSectionItemReducer: (options: any, sectionItem: any) => any = (options, sectionItem) => {
  return R.isEmpty(sectionItem.tableNo)
    ? options
    : sectionItem.type === 'header'
    ? R.reduce(optionSectionItemReducer, options, sectionItem.children)
    : R.append(R.dissoc('pathTemplate', sectionItem), options)
}
const options = R.reduce(optionSectionItemReducer, [optionAll, optionNone], assessments.fra2020)
const outsideClick = (that: any) => (evt: any) => {
  if (!that.refs.multiSelect.contains(evt.target)) {
    that.setState({ open: false })
  }
}
type MultiSelectState = any
type Props = {
  i18n: any
  onChange: any
  values: any
  disabled?: boolean
}
export default class MultiSelect extends React.Component<Props, MultiSelectState> {
  outsideClick: any

  constructor(props: Props) {
    super(props)
    this.state = { open: false }
    this.outsideClick = outsideClick(this)
    window.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.outsideClick)
  }

  toggleOpen() {
    this.setState((state: any) => ({
      open: !state.open,
    }))
  }

  localizeOption(option: any) {
    const { i18n } = this.props
    return R.contains(option, [optionAll, optionNone]) ? i18n.t(option.label) : option.tableNo // + ', ' + i18n.t(option.label)
  }

  getValues(defaultValues: any[] = []) {
    return R.defaultTo(defaultValues, (this.props as any).values)
  }

  sortValues(values: any) {
    return R.sortBy(R.prop('tableNo'), values)
  }

  removeOption(option: any) {
    const { onChange } = this.props
    const values = this.getValues()
    const updValues = R.reject(R.equals(option), values)
    updValues.length === 0 ? onChange([optionAll]) : onChange(this.sortValues(updValues))
  }

  addOption(option: any) {
    const { onChange } = this.props
    const values = this.getValues()
    R.contains(option, [optionAll, optionNone])
      ? onChange([option])
      : onChange(
          R.pipe(
            R.reject(R.equals(optionAll)),
            R.reject(R.equals(optionNone)),
            // @ts-ignore
            R.append(option),
            this.sortValues
            // @ts-ignore
          )(values)
        )
  }

  toggleOption(option: any) {
    const { values = [] } = this.props
    if (R.contains(option, values)) this.removeOption(option)
    else this.addOption(option)
  }

  render() {
    const values = this.getValues([optionAll])
    const { disabled } = this.props
    return (
      <div
        ref="multiSelect"
        tabIndex={0}
        onMouseDown={disabled ? null : this.toggleOpen.bind(this)}
        onFocus={() => (disabled ? null : this.setState({ open: true }))}
        onBlur={() => (disabled ? null : this.setState({ open: false }))}
        className={`${disabled ? '' : 'multi-select'} ${this.state.open ? 'has-focus' : ''}`}
      >
        <div className="multi-select__closed-content">
          {R.isEmpty(values) ? (
            <span className="multi-select__placeholder">{(this.props as any).i18n.t('multiSelect.placeholder')}</span>
          ) : (
            R.pipe(
              R.map((option: any) =>
                R.contains(option, [optionAll, optionNone]) ? this.localizeOption(option) : option.tableNo
              ),
              R.join(', ')
            )(values)
          )}
        </div>
        {disabled ? null : (
          <div className="multi-select__opened-content-anchor">
            {this.state.open ? (
              <div className="multi-select__opened">
                {options.map((option: any) => (
                  <div
                    className="multi-select__opened-item"
                    key={option.tableNo}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => this.toggleOption(option)}
                  >
                    <span className={`fra-checkbox ${R.contains(option, values) ? 'checked' : ''}`} />
                    <span className="multi-select__opened-item-label">{this.localizeOption(option)}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
