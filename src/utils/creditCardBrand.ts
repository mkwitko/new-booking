/* eslint-disable no-continue */
import {
  amex,
  credicard,
  diners,
  elo,
  goodcard,
  hiper,
  hipercard,
  mastercard,
  visa,
  jcb,
  discover,
  creditCardVcn,
} from '@/assets/b2b/credit-card-icons';

type CreditCardTypeCardBrandId =
  | 'AMERICAN EXPRESS'
  | 'DINERS CLUB'
  | 'DISCOVER'
  | 'ELO'
  | 'HIPER'
  | 'HIPERCARD'
  | 'JCB'
  | 'MAESTRO'
  | 'MASTER CARD'
  | 'MIR'
  | 'UNIONPAY'
  | 'CREDICARD'
  | 'GOOD CARD'
  | 'VISA';

interface ICreditCard {
  code: string;
  name: CreditCardTypeCardBrandId;
  imagePath: string;
}

const creditCardImage: ICreditCard[] = [
  {
    code: 'VI',
    name: 'VISA',
    imagePath: visa,
  },
  {
    code: 'DN',
    name: 'DINERS CLUB',
    imagePath: diners,
  },
  {
    code: 'AX',
    name: 'AMERICAN EXPRESS',
    imagePath: amex,
  },
  {
    code: 'MC',
    name: 'MASTER CARD',
    imagePath: mastercard,
  },
  {
    code: 'CC',
    name: 'CREDICARD',
    imagePath: credicard,
  },
  {
    code: 'GC',
    name: 'GOOD CARD',
    imagePath: goodcard,
  },
  {
    code: 'HIP',
    name: 'HIPERCARD',
    imagePath: hipercard,
  },
  {
    code: 'AL',
    name: 'ELO',
    imagePath: elo,
  },
  {
    code: '',
    name: 'JCB',
    imagePath: jcb,
  },
  {
    code: '',
    name: 'DISCOVER',
    imagePath: discover,
  },
];

function getCreditCardImagePathByCode(code: string) {
  return creditCardImage.find((e) => e.code === code);
}

function getCreditCardImage(brand: string) {
  return creditCardImage.find((e) => e.name === brand)?.imagePath || creditCardVcn;
}

export { creditCardImage, getCreditCardImagePathByCode, getCreditCardImage };
