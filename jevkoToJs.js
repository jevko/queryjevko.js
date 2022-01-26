export const jevkoToJs = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length === 0) return suffix
  const {prefix} = subjevkos[0]
  if (prefix === '') return toList(jevko)
  return toMap(jevko)
}
const toList = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (suffix !== '') throw Error('suffix nonempty')
  const ret = []
  for (const {prefix, jevko} of subjevkos) {
    if (prefix !== '') throw Error('prefix nonempty')
    ret.push(jevkoToJs(jevko))
  }
  return ret
}
const toMap = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (suffix !== '') throw Error('suffix nonempty')
  const ret = new Map()
  for (const {prefix, jevko} of subjevkos) {
    if (prefix === '') throw Error('prefix empty')
    if (ret.has(prefix)) throw Error(`duplicate key ${prefix}`)
    ret.set(prefix, jevkoToJs(jevko))
  }
  return ret
}