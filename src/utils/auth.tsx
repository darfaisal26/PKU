export const getAuthToken = () => {
  // Replace 'yourTokenCookieName' with the actual name of your cookie
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
