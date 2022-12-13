import * as fs from 'fs'
import * as path from 'path'
import { Objects } from '@utils/objects'
import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { Requests } from '@server/utils'

const fileName = 'calculator'
const availableLanguages = ['en', 'fr', 'es', 'ru']

export const getBiomassStockFile = async (
  req: Request<never, never, never, { countryIso: CountryIso; language: string; selectedDomain: string }>,
  res: Response
) => {
  try {
    const { countryIso, language, selectedDomain: countryDomain } = req.query

    if (Objects.isEmpty(countryDomain)) {
      res.status(500).json({ error: `Could not find domain for country ${countryIso}` })
      return
    }

    const lang = availableLanguages.includes(language) ? language : 'en'

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'static',
      'biomassStock',
      `${fileName}_${countryDomain}_${lang}.xlsx`
    )
    const fallbackFilePath = path.resolve(
      __dirname,
      '..',
      '..',
      'static',
      'biomassStock',
      `${fileName}_${countryDomain}_en.xlsx`
    )

    if (fs.existsSync(filePath)) {
      res.download(filePath, 'BiomassCalculator.xlsx')
    } else {
      res.download(fallbackFilePath, 'BiomassCalculator.xlsx')
    }
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
