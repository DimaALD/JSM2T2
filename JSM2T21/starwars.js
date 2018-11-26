const fs = require('fs')
const wstream = fs.createWriteStream('STAR_WARS.json')
const request = require('request-promise')
const yargs = require('yargs')

// eslint-disable-next-line no-unused-expressions
yargs.command(
  'find [type] [name]',
  'Input type and name to find info about Star Wars universe.',
  {},
  (argv) => {
    findInfo(argv)
  })
  .demandCommand(1, 'You need at least one command before moving on').argv

function findInfo (argv) {
  const options = {
    method: 'GET',
    uri: 'https://swapi.co/api/' + `${argv.type}` + '/?search=' + `${argv.name}`,
    json: true
  }
  request(options).then(body => {
    printInFile(JSON.stringify(body.results, null, ' '))
  }).catch(err => { console.log(err.message) })
}

function printInFile (json) {
  wstream.write(json)
  wstream.end()
}
