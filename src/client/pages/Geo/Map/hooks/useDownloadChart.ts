export const useDownloadChart = (chart: any, filename: string) => {
  return () => {
    const image = chart.toBase64Image()
    const a = document.createElement('a')
    a.href = image
    a.download = filename
    // Trigger the download
    a.click()
    a.remove()
  }
}
