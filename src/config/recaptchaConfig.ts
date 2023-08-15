export const recaptcha = {
  clientId: String(process.env.REACT_APP_RECAPTCHA_CLIENT_ID),
  siteKey: String(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
  url: String(process.env.REACT_APP_RECAPTCHA_BACKEND_URL),
}
