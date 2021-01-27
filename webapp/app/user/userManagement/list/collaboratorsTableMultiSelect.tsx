import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { assessments } from '@common/assessmentSectionItems'

const optionAll = { tableNo: 'all', section: 'all', label: 'contactPersons.all' }
const optionNone = { tableNo: 'none', section: 'none', label: 'contactPersons.none' }
const optionSectionItemReducer = (options: any, sectionItem: any) => {
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
export default class MultiSelect extends React.Component<{}, MultiSelectState> {
  outsideClick: any

  constructor(props: {}) {
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'i18n' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const { i18n } = this.props
    return R.contains(option, [optionAll, optionNone]) ? i18n.t(option.label) : option.tableNo // + ', ' + i18n.t(option.label)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'defaultValues' implicitly has an 'any[]... Remove this comment to see the full error message
  getValues(defaultValues = []) {
    return R.defaultTo(defaultValues, (this.props as any).values)
  }

  sortValues(values: any) {
    return R.sortBy(R.prop('tableNo'), values)
  }

  removeOption(option: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
    const { onChange } = this.props
    const values = this.getValues()
    const updValues = R.reject(R.equals(option), values)
    updValues.length === 0 ? onChange([optionAll]) : onChange(this.sortValues(updValues))
  }

  addOption(option: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
    const { onChange } = this.props
    const values = this.getValues()
    R.contains(option, [optionAll, optionNone])
      ? onChange([option])
      : onChange(
          R.pipe(
            R.reject(R.equals(optionAll)),
            R.reject(R.equals(optionNone)),
            R.append(option),
            this.sortValues
          )(values)
        )
  }

  toggleOption(option: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'values' does not exist on type 'Readonly... Remove this comment to see the full error message
    const { values = [] } = this.props
    if (R.contains(option, values)) this.removeOption(option)
    else this.addOption(option)
  }

  render() {
    const values = this.getValues([optionAll])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
    const { disabled } = this.props
    return (
      <div
        ref="multiSelect"
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
        tabIndex="0"
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
