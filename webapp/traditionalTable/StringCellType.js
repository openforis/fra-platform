
const StringInput = ({countryIso, tableSpec, tableData, rowIdx, colIdx, tableValueChanged, tableChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <input
      type="text"
      value={currentValue}
      onChange={
        (evt) => {
          tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, evt.target.value)
        }
      }/>
  </td>
}

export default (cellSpec) => ({
  render: (props) => <StringInput {...props}/>,
  acceptValue: (newValue, _) => newValue
})
