# cmd

Composable command line application library

**NOTE:** This library is unstable and very much in a pre-alpha state.

## Install

```
npm install cmd --save
```

## Usage

```js
var cli = require('cmd')
var command = require('cmd-command')
var flag = require('cmd-flag')
var alias = require('cmd-alias')
var handler = require('cmd-handler')

var login = command(
  alias('login', 'l'),
  handler(function (context) {

    // Do some login logic

    // context.data
    // context.flags
    // context.options
  })
)

var tokenFlag = flag(
  alias('-t', '--token'),
  handler(function (token, context) {

    // Do some token logic

    // token is input from argv
    // context.data
    // context.flags
    // context.options
  })
)

var run = cli(
  login(/* pass in options here */),
  tokenFlag(/* pass in options here */)
)

run(process.argv.slice(2))
```
