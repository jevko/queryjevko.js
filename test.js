import {parseJevko} from './parseJevko.js'
import { jevkoToJs } from './jevkoToJs.js'
import { jsToJevko } from './jsToJevko.js'

const isReencodable = (str) => jsToJevko(jevkoToJs(parseJevko(str))) === str

const cases = [
  `sort((age)(name))`,
  `include(author)fields(articles((title)(body))people((name)))`,
]

for (const c of cases) {
  console.assert(isReencodable(c), c)
}