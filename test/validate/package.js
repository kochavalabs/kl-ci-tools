/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { NonSemverDeps, ValidatePackage } from '../../src/validate/package.js'

describe('validate package', () => {
  it('dependencies semver pass', () => {
    const testPackage = {
      'dependencies': {
        'commander': '^5.1.0',
        'number_two': '^1.1.0'
      }
    }
    expect(ValidatePackage(testPackage)).to.be.true
  })

  it('dependencies develop fail', () => {
    const testPackage = {
      'dependencies': {
        'commander': '^5.1.0',
        'c2': '^5.1.0',
        'number_two': 'develop'
      }
    }
    expect(ValidatePackage(testPackage)).to.be.false
  })
})

describe('Check semver deps', () => {
  it('All good deps', () => {
    const testPackage = {
      'dependencies': {
        'commander': '^5.1.0',
        'number_two': '^1.1.0'
      }
    }
    expect(NonSemverDeps(testPackage)).to.deep.equal({})
  })

  it('Some bad deps', () => {
    const testPackage = {
      'dependencies': {
        'commander': '^5.1.0',
        'c2': '^5.1.0',
        'number_two': 'develop',
        'number_three': 'latest'
      }
    }
    expect(NonSemverDeps(testPackage)).to.deep.equal({ 'number_two': 'develop', 'number_three': 'latest' })
  })
})
