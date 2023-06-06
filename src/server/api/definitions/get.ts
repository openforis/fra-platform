import { Request, Response } from 'express'

import { getHtml } from 'server/api/definitions/utils/getHtml'

import { readAllowedParameter, readParameterWithAllowedValues } from '../../utils/sanityChecks'

export const getDefinition = async (req: Request, res: Response) => {
  try {
    const lang = readParameterWithAllowedValues(req, 'lang', ['en', 'es', 'fr', 'ru', 'ar', 'zh'])
    const name = readAllowedParameter(req, 'name', (x) => /^[a-z0-9]+$/i.test(x))
    const { assessmentName, cycleName } = req.params

    try {
      const html = await getHtml({ assessmentName, cycleName, lang, name })

      res.send(html)
    } catch (err) {
      // console.error(err)
      if (err.code === 'ENOENT') {
        if (lang !== 'en') {
          res.redirect(`/definitions/en/${name}`)
        } else {
          res.status(404).send('404 / Page not found')
        }
      } else {
        res.status(500).send('An error occured')
      }
    }
  } catch (err) {
    // console.error(err)
    res.status(500).send('An error occured.')
  }
}
