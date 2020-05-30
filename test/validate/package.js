/* eslint no-unused-expressions: 0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { NonSemverDeps, ValidatePackage } from '../../src/validate/package.js'

describe('validate package', () => {
  const runs = [
    { desc: 'good', pack: { 'version': '0.1.0', 'dependencies': { 'commander': '^5.1.0', 'number_two': '^1.1.0' } }, expected: true },
    { desc: 'bad-ver', pack: { 'version': 'v1.0.0', 'dependencies': { 'commander': '^5.1.0', 'number_two': '^1.1.0' } }, expected: false },
    { desc: 'no-ver', pack: { 'dependencies': { 'commander': '^5.1.0', 'number_two': '^1.1.0' } }, expected: false },
    { desc: 'bad-dep', pack: { 'version': '0.1.0', 'dependencies': { 'commander': '^5.1.0', 'number_two': '^1.1.0', 'number_three': 'develop' } }, expected: false }
  ]
  runs.forEach(function (run) {
    it(`Build Receipt Subscription: ${run.desc}`, () => {
      expect(ValidatePackage(run.pack)).to.equal(run.expected)
    })
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
