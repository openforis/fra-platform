const fs = require('fs')
const path = require('path')

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
  statisticalFactsheets: (levelIso) => ({
    key: levelIso,
    folder: 'statisticalFactsheets',
    downloadName: `Statistical Factsheets (${levelIso})`,
    fileType: 'ods',
  }),
}

const getFilepath = (type, lang) => path.resolve(__dirname, type.folder, `${type.key}_${lang}.${type.fileType}`)

const downloadFile = (res, type, lang) => {
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
