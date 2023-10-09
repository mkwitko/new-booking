export const recaptcha = {
    clientId: String(process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_ID),
    siteKey: String(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
    url: String(process.env.NEXT_PUBLIC_RECAPTCHA_BACKEND_URL),
}
