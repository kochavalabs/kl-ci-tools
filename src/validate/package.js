import semver from 'semver'
import Debug from 'debug'

const debug = Debug('kl-ci-tools:validate')

export function ValidatePackage (pack) {
  for (const key in pack.dependencies) {
    const value = pack.dependencies[key]
    if (!semver.valid(semver.coerce(value))) {
      debug('Could not validate version "%s" for dependency "%s"', value, key)
      return false
    }
  }
  return true
}
