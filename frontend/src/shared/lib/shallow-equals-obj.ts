export const shallowEqual = (a: unknown, b: unknown) => {
  if (a === b) return true
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false
  if(Array.isArray(a) || Array.isArray(b) && a === null || b === null) return false
  const aObj = a as Record<string, unknown> 
  const bObj = b as Record<string, unknown> 
  const aKeys = Object.keys(aObj)
  const bKeys = Object.keys(bObj)
  if (aKeys.length !== bKeys.length) return false
  for (const k of aKeys) {
    if (aObj[k] !== bObj[k]) return false
  }

  return true
}
