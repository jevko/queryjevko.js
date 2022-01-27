export const jsToJevko = (value, {
  open = '(',
  close = ')',
  escape = '~'
} = {}) => {
  let ret = ''
  if (typeof value === 'string') {
    for (const c of value) {
      if (c === open || c === close || c === escape) ret += escape
      ret += c
    }
  }
  else if (value instanceof Map) {
    if (value.size === 0) throw Error(`Empty Map not allowed`)
    else if (value.has('')) throw Error(`Empty key not allowed`)
    else for (const [k, v] of value) {
      ret += `${jsToJevko(k)}${open}${jsToJevko(v)}${close}`
    }
  }
  else if (Array.isArray(value)) {
    if (value.length === 0) throw Error(`Empty Array not allowed`)
    else for (const v of value) ret += `${open}${jsToJevko(v)}${close}` 
  }
  else throw Error(`Unrecognized value: ${value}`)
  return ret
}