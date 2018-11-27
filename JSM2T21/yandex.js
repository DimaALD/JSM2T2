const request = require('request-promise')
const yargs = require('yargs')
const fs = require('fs')

const wstream = fs.createWriteStream('TranslatedText.txt')

// eslint-disable-next-line no-unused-expressions
yargs.command(
  'translate <text> <lang>',
  '[lang] - language in which you want to translate. [text] - translated text',
  {},
  (argv) => {
    translate(argv.text, argv.lang)
  })
  .command('read <file> <lang>',
    '[file] - file with translated text.[lang] - language in which you want to translate',
    {},
    (argv) => {
      if (fs.existsSync(argv.file)) {
        const text = fs.readFileSync(argv.file, 'utf8')
        translate(text, argv.lang)
      } else {
        throw new Error('File is not exists.Check path to file')
      }
    })
  .demandCommand(1, 'You need at least one command before moving on').help().argv

function translate (text, language) {
  const options = {
    method: 'POST',
    uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    qs: {
      lang: language,
      key: 'trnsl.1.1.20181125T113532Z.ea0c7729f79ac871.2d4db27e0638aea61a0e0a810556e603acd07079',
      text: text
    },
    json: true
  }
  request(options).then(body => {
    printInFile(body.text.toString())
  })
}

function printInFile (text) {
  wstream.write(text)
  wstream.end()
  console.log('File was created')
}
