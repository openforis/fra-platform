import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'

import { sendErr } from '../utils/requestUtils'

import { persistFile, getFilesList, getFile, deleteFile } from './fileRepositoryRepository'

import { fileTypes, downloadFile } from './fileRepository'

export const init = (app: any) => {
  // get user guide
  app.get(
    '/fileRepository/userGuide/:lang',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        downloadFile(res, fileTypes.userGuide, req.params.lang)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  // statistical factsheets
  app.get('/fileRepository/statisticalFactsheets/:countryIso/:lang', async (req: any, res: any) => {
    try {
      const { countryIso, lang } = req.params
      downloadFile(res, fileTypes.statisticalFactsheets(countryIso), lang)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // data download
  app.get('/fileRepository/dataDownload/:key/:fileType', async (req: any, res: any) => {
    try {
      const { key, fileType } = req.params
      downloadFile(res, fileTypes.dataDownload(key, fileType), 'en')
    } catch (err) {
      sendErr(res, err)
    }
  })

  // upload new file
  app.post(
    '/fileRepository/:countryIso/upload',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const globalFile = req.body.global === 'true'

        const { countryIso } = req.params
        const fileCountryIso = globalFile ? null : countryIso

        const filesList = await db.transaction(persistFile, [req.user, countryIso, req.files.file, fileCountryIso])

        res.json(filesList)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  // get files list
  app.get(
    '/fileRepository/:countryIso/filesList',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const filesList = await getFilesList(req.params.countryIso)

        res.json(filesList)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  // get file
  app.get('/fileRepository/:countryIso/file/:fileId', async (req: any, res: any) => {
    try {
      const file = await getFile(req.params.fileId)

      if (file) {
        res.setHeader('Content-Disposition', `attachment; filename=${file.fileName}`)
        res.end(file.file, 'binary')
      } else {
        res.status(404).send('404 / Page not found')
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  // delete file
  app.delete(
    '/fileRepository/:countryIso/file/:fileId',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const filesList = await db.transaction(deleteFile, [req.user, req.params.countryIso, req.params.fileId])

        res.json(filesList)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}
