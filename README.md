# queryjevko.js

Functions to translate between JavaScript Interoperable Dynamic Values (IDVs) and Query String Jevko -- a Jevko-based format which is designed be both human readable and to fit into URL query strings without escaping. This allows exchanging complex values via query strings in a compact, readable, minimal, and predictable way.

An IDV is a JavaScript value which is either:

* a `string`
* a nonempty `Array` of IDV
* a nonempty `Map` from `string` to IDV

## Installation

### Node.js

```
npm install jevko/queryjevko.js#semver:0.1.0
```

### Deno and the browser

Import from [jsDelivr](https://www.jsdelivr.com/):

```js
import {parseJevko} from 'https://cdn.jsdelivr.net/gh/jevko/queryjevko.j@v0.1.0/mod.js'
```

## Quickstart

```js
import {parseJevko, jevkoToJs, jsToJevko} from 'https://cdn.jsdelivr.net/gh/jevko/queryjevko.js@v0.1.0/mod.js'

const str = `include(author)fields(articles((title)(body))people((name)))`
const map = jevkoToJs(parseJevko(str))

console.log(map) 
// Map(2) {
//   'include' => 'author',
//   'fields' => Map(2) { 'articles' => [ 'title', 'body' ], 'people' => [ 'name' ] }
// }

console.log(jsToJevko(map) === str) 
// true
```

## parseJevko

`parseJevko` takes a string which must conform to the following ABNF grammar:

```abnf
Jevko = *(
  "(" Jevko ")" / 
  "~" ("~" / "(" / ")") / 
  %x0-5a / %x5c / %x5e-5f / 
  %x61-10ffff
)
```

and returns a parse tree for it.

## jevkoToJs

`jevkoToJs` translates the result of `parseJevko` into IDVs.

For example it will translate the result of parsing this:

```
include(author)fields(articles((title)(body))people((name)))
```

into this:

```js
Map(2) {
  'include' => 'author',
  'fields' => Map(2) { 'articles' => [ 'title', 'body' ], 'people' => [ 'name' ] }
}
```

## jsToJevko

`jsToJevko` turns the result of `jevkoToJs` back into a string. For example it turns this:

```js
Map(2) {
  'include' => 'author',
  'fields' => Map(2) { 'articles' => [ 'title', 'body' ], 'people' => [ 'name' ] }
}
```

into this:

```
include(author)fields(articles((title)(body))people((name)))
```

## Attribution

The following piece of example data used here:

```
include(author)fields(articles((title)(body))people((name)))
```

is based on [an example from the JSON API spec](https://jsonapi.org/format/#fetching-sparse-fieldsets).

***

[MIT License](LICENSE)

© 2022 [xtao.org](https://xtao.org)

