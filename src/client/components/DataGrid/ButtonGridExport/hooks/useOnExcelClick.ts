import { RefObject, useCallback } from 'react'

import { exportGridDataToExcel } from 'client/components/DataGrid/ButtonGridExport/excelExport'

import { useGetExportData } from './useGetExportData'

type Props = {
  filename: string
  gridRef: RefObject<HTMLDivElement>
}

export const useOnExcelClick = (props: Props): (() => void) => {
  const { filename, gridRef } = props

  const getExportData = useGetExportData({ gridRef })

  return useCallback((): void => {
    const { data, prependedRowsCount } = getExportData()

    void exportGridDataToExcel({ data, filename, grid: gridRef.current, prependedRowsCount })
  }, [filename, getExportData, gridRef])
}
