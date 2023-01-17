export const toUTCDate = (isoStr) => {
  const date = new Date(isoStr)
  const timestampWithOffset = date.getTime()
  const dateWithOffset = new Date(timestampWithOffset)
  return `${dateWithOffset.toDateString()}`
}
