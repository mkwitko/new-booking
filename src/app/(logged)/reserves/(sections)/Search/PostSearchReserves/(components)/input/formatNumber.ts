import { replace } from "lodash";
import numeral from "numeral";

// FIXME - Passar para utils @PEDRO
export function intlCurrencyConfig() {
  const lang = navigator.language;
  return {
    locale: lang,
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };
}

export function fPercent(number: any) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number: any) {
  return numeral(number).format();
}

export function fShortenNumber(number: any) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number: any) {
  return numeral(number).format("0.0 b");
}
