export const getAuthToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
