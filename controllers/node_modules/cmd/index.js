var asArray = require('as-array')
var minimist = require('minimist')
var omit = require('ramda/src/omit')
var pipe = require('ramda/src/pipe')
var map = require('ramda/src/map')

var utils = require('cmd-utils')

var getCommands = utils.getCommands
var getFlags = utils.getFlags
var applyFunctions = utils.applyFunctions

module.exports = function cli () {

  // TODO: Need to flatten and merge the contexts
  //       for use with things like use()

  var contexts = asArray(arguments)

  return function (argv) {

    var input = minimist(argv)
    var data = input._
    var flags = omit('_')(input)

    var runCommands = pipe(
      getCommands(data),
      map(applyFunctions(data, flags))
    )

    var runFlags = pipe(
      getFlags(flags, contexts),
      map(applyFunctions(data, flags))
    )

    runFlags(contexts)
    runCommands(contexts)
  }
}
