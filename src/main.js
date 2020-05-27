import program from 'commander'
import fs from 'fs'
import { ValidatePackage } from './validate/package.js'

const validateCmd = program.command('validate')
const validateDesc = `
Looks for a package.json in the current directory and validates it.

Examples:
  kl-cli-tools validate
 `

validateCmd.description(validateDesc)
validateCmd.action(async function () {
  fs.readFile('package.json', function (err, contents) {
    if (err) {
      return console.error(err)
    }
    const pJSON = JSON.parse(contents)
    if (!ValidatePackage(pJSON)) {
      throw new Error('package json did was not valid')
    }
  })
})

const tagCmd = program.command('tag <val>')
const tagDesc = `
Appends text to the end of a package version in the package.json

Examples:
  kl-cli-tools tag 'add-to-version'
 `

tagCmd.description(tagDesc)
tagCmd.action(async function (toAppend) {
  fs.readFile('package.json', function (err, contents) {
    if (err) {
      return console.error(err)
    }
    const pJSON = JSON.parse(contents)
    pJSON['version'] = pJSON['version'] + '-' + toAppend
    fs.writeFile('package.json', JSON.stringify(pJSON, null, 2), function (err) {
      if (err !== null) {
        throw err
      }
    })
  })
})

program.on('command:*', function (command) {
  program.help()
})

program.parse(process.argv)
