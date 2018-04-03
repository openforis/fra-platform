const printMode = 'print-mode'

export const setPrintingMode = () =>
  document.body.classList.add(printMode)

export const isPrintingMode = () =>
  document.body.classList.contains(printMode)
