const currencyLocales: any = {
  USD: 'en-US',
  EUR: 'en-GB', // "fr-FR" for French locale
  GBP: 'en-GB',
  JPY: 'ja-JP',
  AUD: 'en-AU',
  BRL: 'pt-BR',
  ARS: 'es-AR',
  CAD: 'en-CA',
  CHF: 'fr-CH',
  CNY: 'zh-CN',
  RUB: 'ru-RU',
  KRW: 'ko-KR',
  TRY: 'tr-TR',
  INR: 'en-IN',
  NZD: 'en-NZ',
}

export function fCurrency(value: any, currencyCode = 'BRL') {
  try {
    const locale = currencyLocales[currencyCode]
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    })
    const formattedValue = formatter.format(value)

    // Remove currency symbol and keep only the numeric part
    const valueWithoutCurrencySymbol = formattedValue.replace(/[^\d.,-]/g, '')
    return `${currencyCode} ${valueWithoutCurrencySymbol}`
  } catch (error) {
    console.error('Error formatting currency:', error)
    return ''
  }
}
