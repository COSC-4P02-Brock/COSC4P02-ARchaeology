export function isMobileDevice() {
  return /Android|iPhone/i.test(navigator?.userAgent)
}
