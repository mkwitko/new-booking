export const isMobile = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};

export const maskPhone = (phone: any) => {
  let tel = phone.replace(/\D/g, "");
  const { length } = tel;

  // if (length >= 12) {
  //   return false;
  // }

  if (length > 10) {
    tel = tel.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (length > 5) {
    tel = tel.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (length > 2) {
    tel = tel.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    tel = tel.replace(/^(\d*)/, "($1");
  }

  return tel;
};

export const maskCnpj = (cnpj: string) => {
  let cnpjMask = cnpj.replace(/\D/g, "");
  const { length } = cnpjMask;

  if (length >= 15) {
    return false;
  }

  if (length > 12) {
    cnpjMask = cnpjMask.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      "$1.$2.$3/$4-$5",
    );
  } else if (length > 8) {
    cnpjMask = cnpjMask.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{1,2}).*/,
      "$1.$2.$3/$4",
    );
  } else if (length > 5) {
    cnpjMask = cnpjMask.replace(/^(\d{2})(\d{3})(\d{1,3}).*/, "$1.$2.$3");
  } else if (length > 2) {
    cnpjMask = cnpjMask.replace(/^(\d{2})(\d{1,3}).*/, "$1.$2");
  } else {
    cnpjMask = cnpjMask.replace(/^(\d*)/, "$1");
  }

  return cnpjMask;
};

export function blobToBase64(blob: any, cb: any) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    const base64data = reader.result;
    cb(base64data);
  };
}
