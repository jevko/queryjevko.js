# queryjevko.js

Functions to translate between JavaScript Interoperable Dynamic Values (IDVs) and Query String Jevko -- a Jevko-based format which can encode them in URL query strings. This allows exchanging complex values via query strings in a compact, minimal, and predictable way.

An IDV is a JavaScript value which is either:

* a `string`
* a nonempty `Array` of IDV
* a nonempty `Map` from `string` to IDV

## parseJevko

`parseJevko` takes a string which must conform to the following ABNF grammar:

```abnf
Jevko = *("(" Jevko ")" / "~" ("~"/"("/")") / %x0-5a/%x5c/%x5e-5f/%x61-10ffff)
```

and returns a parse tree for it.

## jevkoToJs

`jevkoToJs` translates the result of `parseJevko` into IDVs.

For example `jevkoToJs` will translate the result of parsing this:

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

***

[MIT License](LICENSE)

© 2022 [xtao.org](https://xtao.org)

