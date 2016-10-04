export const generateId = () => {
  const serie = () => (Math.random().toString(36).substring(4))
  return `id-${serie()}-${serie()}`
}
