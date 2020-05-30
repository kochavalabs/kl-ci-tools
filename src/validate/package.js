import semver from 'semver'
import Debug from 'debug'

const debug = Debug('kl-ci-tools:validate')

export function NonSemverDeps (pack) {
  const result = {}
  for (const key in pack.dependencies) {
    const value = pack.dependencies[key]
    if (semver.valid(semver.coerce(value)) === null) {
      debug('Could not validate version "%s" for dependency "%s"', value, key)
      result[key] = value
    }
  }
  return result
}

export function ValidatePackage (pack) {
  if (semver.valid(pack.version) === null || semver.clean(pack.version) !== pack.version) {
    return false
  }
  if (Object.keys(NonSemverDeps(pack)).length !== 0) {
    return false
  }
  return true
}
