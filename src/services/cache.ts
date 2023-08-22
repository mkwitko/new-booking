import localforage from 'localforage';

export function set(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    if (value) {
      const limit = 20000;
      if (value.length > limit) {
        console.log('too big - ', value);
        localforage.setItem(key, value);
      } else localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}

export function get(key: string) {
  if (typeof window !== 'undefined') {
    const cached = JSON.parse(localStorage.getItem(key) || '{}');
    return cached;
  }
}

export async function getLocalStorage(key: string) {
  return await localforage.getItem(key).then((res) => {
    return res;
  });
}
