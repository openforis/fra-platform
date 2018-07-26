const fs = require('fs')

const fileTypes = {
  userGuide: {
    key: 'userGuide',
    downloadName: 'User Guide FRA Platform',
    fileType: 'pdf',
  },
  panEuropeanQuestionnaire: {
    key: 'panEuropeanQuestionnaire',
    downloadName: 'Pan European Questionnaire',
    fileType: 'xls',
  },
}

const downloadFile = (res, type, lang) => {

  const rootPath = `${__dirname}/${type.key}/${type.key}`

  const getFilepath = (type, lang) => `${rootPath}_${lang}.${type.fileType}`

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
