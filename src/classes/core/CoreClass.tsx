'use client'

import { B2BApi } from '@/infra/api/B2BApi';
import { CACHE_PATH } from '@/config/cache';
import useCoreHook from './hook/useCoreHook';
import { get, getLocalStorage, set } from '@/services/cache';
import { AxiosRequestConfig } from 'axios';

export default class CoreClass {
  url = ''
  cachePath = ''

  getMethods: any
  postMethods: any
  putMethods: any
  deleteMethods: any

  CACHE_PATH = CACHE_PATH

  hook: any = useCoreHook()

  async getCache(key?: string) {
    const cached = get(key || this.cachePath)
    if (Object.keys(cached).length === 0) {
      return getLocalStorage(key || this.cachePath).then((res) => {
        return res
      })
    }
    return cached
  }

  async setCache(value: any, shouldUpdate = false, key?: string) {
    const cache = await this.getCache(key || this.cachePath)
    if (shouldUpdate || !cache || !this.hasObject(cache))
      set(key || this.cachePath, value)
  }

  async getHttp<T>(method: typeof this.getMethods, url?: string) {
    return B2BApi.get<T>(this.makeUrl(method, url || undefined))
      .then((response) => {
        const { data } = response
        return data
      })
      .catch((err) => {
        console.log('err - ', err)
        return err
      })
  }

  async postHttp(
    method: typeof this.postMethods,
    value: any,
    url?: string,
    configs: AxiosRequestConfig = {}
  ) {
    return B2BApi.post(this.makeUrl(method, url || undefined), value, configs)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  }

  async putHttp(
    method: typeof this.putMethods,
    value: any,
    url?: string,
    config?: any,
  ) {
    return B2BApi.put(this.makeUrl(method, url || undefined), value, config)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  }

  async setClass<T>(
    shouldUpdate = true,
    method?: typeof this.getMethods,
    custom: {
      url?: string
      cachePath?: string
    } | null = null,
  ) {
    const cache = await this.getCache()
    const request = this.isCustomRequest(custom)
    if (!cache || !this.hasObject(cache) || shouldUpdate) {
      const response = await this.getHttp<T>(method || '', request.url)
      console.log('data - ', response.data)
      await this.setCache(response.data, shouldUpdate, request.cachePath)
      return response
    } else {
      return cache
    }
  }

  private makeUrl(method: string, url?: string) {
    const baseUrl = url || this.url
    const _url = method !== '' ? baseUrl + '/' + method : baseUrl
    return _url
  }

  private isCustomRequest(custom: any) {
    if (custom) {
      return {
        url: custom.url || this.url,
        cachePath: custom.cachePath || this.cachePath,
      }
    }
    return {
      url: this.url,
      cachePath: this.cachePath,
    }
  }

  private hasObject(data: any) {
    return Object.keys(data).length > 0
  }
}
