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

program.on('command:*', function (command) {
  program.help()
})

program.parse(process.argv)
