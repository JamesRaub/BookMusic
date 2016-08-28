var test = require('tape')
var cli = require('./')

var command = require('cmd-command')
var flag = require('cmd-flag')
var alias = require('cmd-alias')
var handler = require('cmd-handler')

test('returns run function', function (t) {

  t.equal(typeof cli(), 'function', 'return value')
  t.end()
})

test('run commands and flags', function (t) {

  t.plan(7)

  var c = command(
    alias('test'),
    handler(function (context) {

    t.deepEqual(context.data, ['test'], 'command data context')
    t.deepEqual(context.flags, {t: 'value'}, 'flag context')
    t.deepEqual(context.options, {key: 'value'}, 'options context')
    })
  )

  var f = flag(
    alias('-t', '--test'),
    handler(function (value, context) {

      t.equal(value, value, 'flag value')
      t.deepEqual(context.data, ['test'], 'command data context')
      t.deepEqual(context.flags, {t: 'value'}, 'flag context')
      t.deepEqual(context.options, {flag: 'options'}, 'options context')
    })
  )

  var run = cli(
    c({key: 'value'}),
    f({flag: 'options'})
  )

  run(['test', '-t', 'value'])
})


