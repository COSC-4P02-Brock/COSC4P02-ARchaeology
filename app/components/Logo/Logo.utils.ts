export function getFillClassNames(theme: 'light' | 'dark') {
  return {
    blue: 'fill-brand-blue',
    red: 'fill-brand-red',
    text: theme === 'light' ? 'fill-brand-black' : 'fill-white'
  }
}
