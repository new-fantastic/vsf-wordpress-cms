import { currentStoreView } from '@vue-storefront/core/lib/multistore';
// Changes a hrefs to router links with localized route
// REQUIRES VUE FULL BUILD
export default function(anchor: string): string {
  const { storeCode } = currentStoreView()

  return anchor.replace(/href=(["'])/g, 'to=$1')
  .replace(/(to)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/, (match, to, val) => {
    let target
    const value = val.trim()
    const routeUpOptions = [
      'http://routeUp',
      'https://routeUp',
      'routeUp',
      'http://routeUp/',
      'https://routeUp/',
      'routeUp/',
    ]
    if (routeUpOptions.includes(value)) {
      const parts = this.$route.path.split('/')
      if (parts.length > 1) {
        // cut store code
        parts.pop()
      }
      const result = parts.join('/')
      target = !result.startsWith('/') ? `/${result}` : result
    } else if (value.startsWith(`/${storeCode}/`)) {
      target = value 
    } else if (value.startsWith(`${storeCode}/`)) {
      target = '/' + value 
    } else if (value.startsWith(`/${storeCode}`)) {
      target = value.replace(`/${storeCode}`, `/${storeCode}/`)
    } else if (value.startsWith(`${storeCode}`)) {
      target = value.replace(`${storeCode}`, `/${storeCode}/`)
    } else if (value.startsWith('/')) {
      target = '/' + storeCode + value
    } else {
      target = '/' + storeCode + '/' + value
    }
    return `${to}=\"${target}\"`
  })
  .replace(/<a/g, "<router-link")
  .replace(/<\/a/g, '</router-link');
}