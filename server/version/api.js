const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const getSha = () => {
  return fs.readFileAsync(`.git/refs/heads/master`, 'utf8')
}

module.exports.init = app => {
  app.get('/version', (req, res) => {
    const shaRes = getSha()
    shaRes.then(sha => {

      res.send(`<html>
        <head>
          <link rel="stylesheet" href="/css/definition.css"/>
        </head>
        <body>
          <table>
            <tr>
              <th>Latest commit SHA:</th>
              <td>${sha}</td>
            </tr>
          </table>
        </body>
        </html>`)
    })
  })
}
