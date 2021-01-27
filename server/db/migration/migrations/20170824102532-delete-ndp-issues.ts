// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'dbm'.
let dbm
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'type'.
let type
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'seed'.
let seed
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
let Promise

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options: any, seedLink: any) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
  Promise = options.Promise
}

exports.up = function (db: any) {
  const filePath = path.join(__dirname, 'sqls', '20170824102532-delete-ndp-issues-up.sql')
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err: any, data: any) {
      if (err) return reject(err)
      console.log(`received data: ${data}`)

      resolve(data)
    })
  }).then(function (data) {
    return db.runSql(data)
  })
}

exports.down = function (db: any) {
  const filePath = path.join(__dirname, 'sqls', '20170824102532-delete-ndp-issues-down.sql')
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err: any, data: any) {
      if (err) return reject(err)
      console.log(`received data: ${data}`)

      resolve(data)
    })
  }).then(function (data) {
    return db.runSql(data)
  })
}

exports._meta = {
  version: 1,
}
