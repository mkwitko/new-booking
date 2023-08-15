'use client';

import { B2BApi } from '@/infra/api/B2BApi';
import { CACHE_PATH } from '@/config/cache';
import useCoreHook from './hook/useCoreHook';
import { get, set } from '@/services/cache';

export default class CoreClass {
  url = '';
  cachePath = '';

  getMethods: any;
  postMethods: any;
  putMethods: any;
  deleteMethods: any;

  CACHE_PATH = CACHE_PATH;

  hook: any = useCoreHook();

  getCache(key?: string) {
    return get(key || this.cachePath);
  }

  setCache(value: any, shouldUpdate = false, key?: string) {
    const cache = this.getCache(key || this.cachePath);
    if (shouldUpdate || !this.hasObject(cache))
      set(key || this.cachePath, value);
  }

  async getHttp<T>(method: typeof this.getMethods, url?: string) {
    return B2BApi.get(this.makeUrl(method, url || undefined))
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((err) => {
        console.log('err - ', err);
        return err;
      });
  }

  async postHttp(method: typeof this.postMethods, value: any, url?: string) {
    return B2BApi.post(this.makeUrl(method, url || undefined), value)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async putHttp(
    method: typeof this.putMethods,
    value: any,
    url?: string,
    config?: any
  ) {
    return B2BApi.put(this.makeUrl(method, url || undefined), value, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async setClass(
    shouldUpdate = true,
    custom: {
      url?: string;
      cachePath?: string;
    } | null = null,
    method?: string
  ) {
    const cache = this.getCache();
    const request = this.isCustomRequest(custom);
    if (!this.hasObject(cache) || shouldUpdate) {
      const response = await this.getHttp(method || '', request.url);
      this.setCache(response, shouldUpdate, request.cachePath);
      return response;
    } else {
      return cache;
    }
  }

  setAlphaId(method: any) {
    return this.hook.alphaId + '/' + method;
  }

  private makeUrl(method: string, url?: string) {
    let baseUrl = url || this.url;
    if (this.hook.alphaId) baseUrl += '/' + this.hook.alphaId + '/';
    const _url = method !== '' ? baseUrl + method : baseUrl;
    return _url;
  }

  private isCustomRequest(custom: any) {
    if (custom) {
      return {
        url: custom.url || this.url,
        cachePath: custom.cachePath || this.cachePath,
      };
    }
    return {
      url: this.url,
      cachePath: this.cachePath,
    };
  }

  private hasObject(data: any) {
    return Object.keys(data).length > 0;
  }
}
