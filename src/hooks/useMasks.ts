// FIXME - Passar para utils @PEDRO

export function useMasks() {
  function createCPFMask(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const cpf = data.replace(/\D/g, "");
    const cpfLength = cpf.length;

    if (cpfLength <= 3) {
      return cpf;
    }

    if (cpfLength <= 6) {
      const cpfFormatted = `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
      return cpfFormatted;
    }

    if (cpfLength <= 9) {
      const cpfFormatted = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
        6,
      )}`;
      return cpfFormatted;
    }

    const cpfFormatted = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9,
    )}-${cpf.slice(9)}`;

    return cpfFormatted;
  }

  function createCreditCardNumberMask(
    data: string | null | undefined,
  ): string | null {
    if (!data) {
      return null;
    }

    const card = data.replace(/\D/g, "");
    const cardLength = card.length;

    if (cardLength <= 4) {
      return card;
    }

    if (cardLength <= 8) {
      const creditCardFormatted = `${card.slice(0, 4)} ${card.slice(4)}`;
      return creditCardFormatted;
    }

    if (cardLength <= 12) {
      const creditCardFormatted = `${card.slice(0, 4)} ${card.slice(
        4,
        8,
      )} ${card.slice(8)}`;
      return creditCardFormatted;
    }

    const creditCardFormatted = `${card.slice(0, 4)} ${card.slice(
      4,
      8,
    )} ${card.slice(8, 12)} ${card.slice(12)}`;

    return creditCardFormatted;
  }

  function createCNPJMask(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const cnpj = data.replace(/\D/g, "");
    const cnpjLength = cnpj.length;

    if (cnpjLength <= 2) {
      return cnpj;
    }

    if (cnpjLength <= 5) {
      const cnpjFormatted = `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
      return cnpjFormatted;
    }

    if (cnpjLength <= 8) {
      const cnpjFormatted = `${cnpj.slice(0, 2)}.${cnpj.slice(
        2,
        5,
      )}.${cnpj.slice(5)}`;
      return cnpjFormatted;
    }

    if (cnpjLength <= 12) {
      const cnpjFormatted = `${cnpj.slice(0, 2)}.${cnpj.slice(
        2,
        5,
      )}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
      return cnpjFormatted;
    }

    const cnpjFormatted = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
      5,
      8,
    )}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;

    return cnpjFormatted;
  }

  function createExpirationDateMask(data: string | null | undefined): string {
    if (!data) {
      return "";
    }

    const date = data.replace(/\D/g, "");
    const dateLength = date.length;

    if (dateLength <= 2) {
      return date;
    }

    const expirationDateFormatted = `${date.slice(0, 2)}/${date.slice(2)}`;

    return expirationDateFormatted;
  }

  function createPhoneNumberMask(
    data: string | null | undefined,
  ): string | null {
    if (!data) {
      return null;
    }

    const phone = data.replace(/\D/g, "");
    const phoneLength = phone.length;

    if (phoneLength <= 2) {
      return phone;
    }

    if (phoneLength <= 6) {
      const phoneFormatted = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
      return phoneFormatted;
    }

    if (phoneLength <= 10) {
      const phoneFormatted = `(${phone.slice(0, 2)}) ${phone.slice(
        2,
        6,
      )}-${phone.slice(6)}`;
      return phoneFormatted;
    }

    const phoneFormatted = `(${phone.slice(0, 2)}) ${phone.slice(
      2,
      6,
    )}-${phone.slice(6, 10)}-${phone.slice(10)}`;

    return phoneFormatted;
  }

  return {
    createCPFMask,
    createCNPJMask,
    createExpirationDateMask,
    createCreditCardNumberMask,
    createPhoneNumberMask,
  };
}
