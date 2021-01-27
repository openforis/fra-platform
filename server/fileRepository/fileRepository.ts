import * as fs from 'fs'
import * as path from 'path'

export const fileTypes = {
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

export const getFilepath = (type: any, lang: any) =>
  path.resolve(__dirname, type.folder, `${type.key}_${lang}.${type.fileType}`)

export const downloadFile = (res: any, type: any, lang: any) => {
  const filePath = getFilepath(type, lang)
  const fallbackFilePath = getFilepath(type, 'en')

  if (fs.existsSync(filePath)) {
    res.download(filePath, `${type.downloadName}.${type.fileType}`)
  } else {
    res.download(fallbackFilePath, `${type.downloadName}.${type.fileType}`)
  }
}

export default {
  fileTypes,
  downloadFile,
}
