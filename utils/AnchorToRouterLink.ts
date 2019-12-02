import { currentStoreView } from '@vue-storefront/core/lib/multistore';
// Changes a hrefs to router links with localized route
// REQUIRES VUE FULL BUILD
export default (anchor: string): string => {
  const { storeCode } = currentStoreView()

  return anchor.replace(/href=(["'])/g, 'to=$1')
  .replace(/(to)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/, (match, to, value) => {
    let target
    if (value.startsWith(`/${storeCode}/`)) {
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