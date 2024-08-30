import * as fs from 'fs'
import * as path from 'path'
import { Response } from 'express'

type Type = {
  key: string
  folder: string
  downloadName: string
  fileType: string
}

/*
 ** @deprecated
 */
export const fileTypes = {
  userGuide: { key: 'userGuide', folder: 'userGuide', downloadName: 'User Guide FRA Platform', fileType: 'pdf' },
  panEuropeanQuestionnaire: {
    key: 'panEuropeanQuestionnaire',
    folder: 'panEuropeanQuestionnaire',
    downloadName: 'Pan European Questionnaire',
    fileType: 'xls',
  },
  statisticalFactsheets: (levelIso: string) => ({
    key: levelIso,
    folder: 'statisticalFactsheets',
    downloadName: `Statistical Factsheets (${levelIso})`,
    fileType: 'ods',
  }),
  dataDownload: (assessmentName: string, cycleName: string, key: string, fileType: string) => ({
    key,
    folder: `${assessmentName}/${cycleName}/dataDownload`,
    downloadName: key.replace(/_/g, ' '),
    fileType,
  }),
  biomassStock: (assessmentName: string, cycleName: string, domain: string) => ({
    key: `calculator_${domain}`,
    folder: `${assessmentName}/${cycleName}/biomassStock`,
    downloadName: `BiomassCalculator_${domain}`,
    fileType: 'xlsx',
  }),
  sdgMetadata: (key: string) => ({
    key,
    folder: `sdgMetadata`,
    downloadName: key,
    fileType: 'pdf',
  }),
}

const _getRepositoryPath = (): string => path.resolve(__dirname, '..', '..', 'static', 'fileRepository')

const _getFilepath = (type: Type, lang: string) =>
  path.resolve(_getRepositoryPath(), type.folder, `${type.key}_${lang}.${type.fileType}`)

const download = (res: Response, type: Type, lang: string) => {
  const filePath = _getFilepath(type, lang)
  const fallbackFilePath = _getFilepath(type, 'en')

  if (fs.existsSync(filePath)) {
    res.download(filePath, `${type.downloadName}.${type.fileType}`)
  } else {
    res.download(fallbackFilePath, `${type.downloadName}.${type.fileType}`)
  }
}

export const FileRepository = {
  download,
}
