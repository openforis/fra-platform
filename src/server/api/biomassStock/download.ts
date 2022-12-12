import * as fs from 'fs'
import { Objects } from '@utils/objects'
import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { Requests } from '@server/utils'

const fileName = 'calculator'
const availableLanguages = ['en', 'fr', 'es', 'ru']

export const biomassStockDownload = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const countryDomain = req.params.domain
    if (Objects.isEmpty(countryDomain)) {
      res.status(500).json({ error: `Could not find domain for country ${req.params.countryIso}` })
      return
    }
    const lang = availableLanguages.includes(req.params.lang) ? req.params.lang : 'en'
    const filePath = `${__dirname}/../../static/biomassStock/${fileName}_${countryDomain}_${lang}.xlsx`
    const fallbackFilePath = `${__dirname}/../../static/biomassStock/${fileName}_${countryDomain}_en.xlsx`

    if (fs.existsSync(filePath)) {
      res.download(filePath, 'BiomassCalculator.xlsx')
    } else if (lang !== 'en' && fs.existsSync(fallbackFilePath)) {
      res.download(fallbackFilePath, 'BiomassCalculator.xlsx')
    } else {
      res.status(404).send('404 / File not found')
    }
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
