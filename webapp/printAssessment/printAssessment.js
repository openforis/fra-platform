const printMode = 'print-mode'

export const setPrintingMode = () =>
  document.body.classList.add(printMode)

export const isPrintingMode = () =>
  document.body.classList.contains(printMode)

export const isPrintingOnlyTables = () => {
  const url = new URL(window.location)
  const params = new URLSearchParams(url.hash.substring(url.hash.indexOf('?') + 1))
  return isPrintingMode() && params.get('onlyTables') === 'true'
}
