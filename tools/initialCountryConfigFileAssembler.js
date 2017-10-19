const faoStat = require('./faoStat')

if (process.argv.length < 3) {
  console.log(`Usage: ${process.argv[0]} <name of the faostat csv file>`)
  process.exit()
}

const fileName  = process.argv[2]
console.log('reading file', fileName)
faoStat.getFaostatValues(fileName)
  .then(values=> console.log(values))
  .catch(err => console.log('Error: ', err))

