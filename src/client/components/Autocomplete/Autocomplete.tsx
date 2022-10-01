import React from 'react'

type Props = {
  disabled: boolean
  value: string
  name?: string
  onChange: any // React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> |  React.MouseEventHandler<HTMLOptionElement>
  onQueryChange: any
  options?: Array<{
    value: string
    label?: string
  }>
}

const Autocomplete = (props: Props) => {
  const { value, name, options, disabled, onChange, onQueryChange } = props

  if (disabled) return <div className="text-input__readonly-view ">{value}</div>

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value)
  }

  return (
    <div>
      <input
        onChange={onInputChange}
        className="text-input__container"
        disabled={disabled}
        type="text"
        id={name}
        name={name}
        list="list"
        value={value}
        onBlur={onChange}
      />
      <datalist id="list">
        {options?.map((option: { value: string; label: string }) => (
          <option key={value} onClick={onChange} value={option.value} label={option.label}>
            {option.label ?? option.value}
          </option>
        ))}
      </datalist>
    </div>
  )
}

Autocomplete.defaultProps = {
  name: 'autocomplete',
  options: undefined, // on data initial load
}

export default Autocomplete
