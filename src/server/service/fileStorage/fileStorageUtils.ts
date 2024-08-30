const mimeTypes: Record<string, string> = {
  zip: 'application/zip',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xlsm: 'application/vnd.ms-excel.sheet.macroEnabled.12',
  xls: 'application/vnd.ms-excel',
  tsv: 'text/tab-separated-values',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  png: 'image/png',
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  jfif: 'image/jpeg',
  gif: 'image/gif',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  csv: 'text/csv',
  crdownload: 'application/octet-stream',
  bmp: 'image/bmp',
}

function getContentType(extension: string): string {
  return mimeTypes[extension] || 'application/octet-stream'
}

export const FileStorageUtils = {
  getContentType,
}
