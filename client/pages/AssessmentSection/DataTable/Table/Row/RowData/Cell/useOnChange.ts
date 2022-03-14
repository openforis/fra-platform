import { ChangeEventHandler, ClipboardEventHandler } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row, Table, NodeValue } from '@meta/assessment'
import { useCountryIso } from '@client/hooks'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'

import { TableData } from '@meta/data'
import { Sanitizer } from './sanitizer'

type Props = {
  table: Table
  row: Row
  col: Col
  nodeValue: NodeValue
  data: TableData
}

type UseOnChange = {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
}

export default (props: Props): UseOnChange => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const {
    props: { name: assessmentName },
  } = useAssessment()
  const cycle = useCycle()
  const {
    props: { name: sectionName },
  } = useAssessmentSection()

  const { table, col, row, nodeValue /* data */ } = props
  const _persistSanitizedValue = (value: string) => {
    // if (Sanitizer.isAcceptable(colType, value)) {
    const valueUpdate = Sanitizer.sanitize({ value })

    dispatch(
      AssessmentSectionActions.updateNodeValue({
        assessmentName,
        countryIso,
        colName: col.props.colName,
        cycleName: cycle.name,
        sectionName,
        tableName: table.props.name,
        variableName: row.props.variableName,
        value: { ...nodeValue, raw: valueUpdate },
      })
    )
  }

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    const { value } = event.target
    _persistSanitizedValue(value)
  }

  // const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
  //   event.stopPropagation()
  //   event.preventDefault()
  //
  //   const { clipboardData } = event
  //   const el = document.createElement('html')
  //   el.innerHTML = clipboardData.getData('text/html')
  //
  //   const rows = el.getElementsByTagName('tr')
  //   const rowSpecs = table.rows
  //
  //   if (rows.length > 0) {
  //     const updatedData = { ...data }
  //     for (let i = 0; i < rows.length; i += 1) {
  //       const rowIdxCurrent = i + Number(row.props.index)
  //       const currRow = rowSpecs[rowIdxCurrent]
  //       if (!currRow) break
  //
  //       const columns = rows[i].getElementsByTagName('td')
  //       for (let j = 0; j < columns.length; j += 1) {
  //         const colIdxCurrent = Number(col.props.index) + j
  //         const currCol = currRow.cols.find((col) => col.props.index === colIdxCurrent)
  //         if (!currCol) break
  //
  //         const colSpecType = currCol.props.colType
  //         let valueUpdate = columns[j].innerText
  //         const readOnly = [ColType.calculated, ColType.header /* ColType.placeholder */].includes(colSpecType)
  //         console.log(1, valueUpdate)
  //         console.log(colSpecType, currCol)
  //         // if (!readOnly && Sanitizer.isAcceptable(colSpecType, valueUpdate)) {
  //         if (!readOnly && Sanitizer.isAcceptable()) {
  //           // valueUpdate = Sanitizer.sanitize(colSpecType, valueUpdate, valuePrev, options)
  //           valueUpdate = Sanitizer.sanitize({ value: valueUpdate })
  //           console.log(2, valueUpdate)
  //           // console.log(valueUpdate)
  //           const currNodeValue = TableDatas.getNodeValue({
  //             data,
  //             countryIso,
  //             table,
  //             row: currRow,
  //             col: currCol,
  //           })
  //           const x = {
  //             data,
  //             countryIso,
  //             colName: currCol.props.colName,
  //             tableName: table.props.name,
  //             variableName: currRow.props.variableName,
  //             value: {
  //               ...currNodeValue,
  //               raw: valueUpdate,
  //             },
  //           }
  //           console.log(valueUpdate, {
  //             ...currNodeValue,
  //             raw: valueUpdate,
  //           })
  //           console.log({ x, y: TableDatas.updateDatum(x) })
  //           break
  //           //
  //         }
  //       }
  //     }
  //     console.log(2, { updatedData })
  //     // dispatch(persistTableData({ assessmentType: assessmentName, sectionName, tableName, data: dataUpdate }))
  //   } else {
  //     const value = clipboardData.getData('text/plain')
  //     _persistSanitizedValue(value)
  //   }
  // }

  const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')

    const rows = el.getElementsByTagName('tr')
    const rowSpecs = table.rows

    if (rows.length > 0) {
      // const dataUpdate = Objects.cloneDeep(data)

      for (let i = 0; i < rows.length; i += 1) {
        const rowIdxCurrent = i + Number(row.props.index)
        const rowSpec = rowSpecs[rowIdxCurrent]
        if (!rowSpec) break

        const columns = rows[i].getElementsByTagName('td')
        for (let j = 0; j < columns.length; j += 1) {
          const colIdxCurrent = Number(col.props.index) + j
          // const colSpec = rowSpec.cols.find((col) => col.props.index === colIdxCurrent)
          console.log(rowIdxCurrent, colIdxCurrent, rowSpec)
          //   if (!colSpec) break
          //
          //   const colSpecType = colSpec.colType
          //   let valueUpdate = columns[j].innerText
          //   const readOnly = [TypeSpec.calculated, TypeSpec.header, TypeSpec.placeholder].includes(colSpecType)
          //
          //   if (!readOnly && Sanitizer.isAcceptable(colSpecType, valueUpdate)) {
          //     valueUpdate = Sanitizer.sanitize(colSpecType, valueUpdate, valuePrev, options)
          //     const params = { state, rowIdx: rowIdxCurrent, colIdx: colIdxCurrent, value: String(valueUpdate) }
          //     dataUpdate = updateTableDataCell(params)(dataUpdate)
          //   }
        }
      }
      // dispatch(persistTableData({ assessmentType: assessmentName, sectionName, tableName, data: dataUpdate }))
    } else {
      const value = clipboardData.getData('text/plain')
      _persistSanitizedValue(value)
    }
  }

  return { onChange, onPaste }
}
