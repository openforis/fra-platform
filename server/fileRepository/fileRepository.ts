// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fileTypes'... Remove this comment to see the full error message
const fileTypes = {
  userGuide: {
    key: 'userGuide',
    folder: 'userGuide',
    downloadName: 'User Guide FRA Platform',
    fileType: 'pdf',
  },
  panEuropeanQuestionnaire: {
    key: 'panEuropeanQuestionnaire',
    folder: 'panEuropeanQuestionnaire',
    downloadName: 'Pan European Questionnaire',
    fileType: 'xls',
  },
  statisticalFactsheets: (levelIso: any) => ({
    key: levelIso,
    folder: 'statisticalFactsheets',
    downloadName: `Statistical Factsheets (${levelIso})`,
    fileType: 'ods',
  }),
}

const getFilepath = (type: any, lang: any) =>
  path.resolve(__dirname, type.folder, `${type.key}_${lang}.${type.fileType}`)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'downloadFi... Remove this comment to see the full error message
const downloadFile = (res: any, type: any, lang: any) => {
  const filePath = getFilepath(type, lang)
  const fallbackFilePath = getFilepath(type, 'en')

  if (fs.existsSync(filePath)) {
    res.download(filePath, `${type.downloadName}.${type.fileType}`)
  } else {
    res.download(fallbackFilePath, `${type.downloadName}.${type.fileType}`)
  }
}

module.exports = {
  fileTypes,
  downloadFile,
}
