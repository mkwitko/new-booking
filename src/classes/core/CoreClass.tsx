"use client";

import { B2BApi } from "@/infra/api/B2BApi";
import { CACHE_PATH } from "@/config/cache";
import useCoreHook from "./hook/useCoreHook";
import { get, getLocalStorage, set } from "@/services/cache";
import { AxiosRequestConfig } from "axios";
import { Auth } from "aws-amplify";
import { mergeConfigs } from "tailwind-merge";

export default class CoreClass {
    url = "";
    cachePath = "";

    getMethods: any;
    postMethods: any;
    putMethods: any;
    deleteMethods: any;

    CACHE_PATH = CACHE_PATH;

    hook: any = useCoreHook();

    async getCache(key?: string) {
        const cached = get(key || this.cachePath);
        if (Object.keys(cached).length === 0) {
            return getLocalStorage(key || this.cachePath).then((res) => {
                return res;
            });
        }
        return cached;
    }

    async setCache(value: any, shouldUpdate = false, key?: string) {
        const cache = await this.getCache(key || this.cachePath);
        if (shouldUpdate || !cache || !this.hasObject(cache))
            set(key || this.cachePath, value);
    }

    async getHttp<T>({
        method = "",
        url = "",
        configs = {},
    }: {
        method?: string;
        url?: string;
        configs?: RequestInit & {
            params?: any;
        };
    }) {
        let params: any = [];
        if (configs.params) {
            console.log('params - ', configs.params);
            Object.keys(configs.params).forEach((key) => {
                if (configs.params[key] !== null && configs.params[key] !== undefined) {
                    params.push(`${key}=${configs.params[key]}`);
                }
            })
        }

        const urlToUse = this.makeUrl(method, url || undefined) + (params.length > 0 ? `?${params.join('&')}` : '');

        const configuration: RequestInit = await this.interceptor();
        const config = await this.mergeConfigurations(configs, configuration);
        return fetch(urlToUse, {
            ...config,
            method: 'GET',
        }).then((response) => {
            const data = response.json();
            return data;
        }).catch((err) => {
            console.log("err - ", err);
            return err;
        });
    }

    async postHttp({
        method = "",
        body = {},
        url = "",
        configs = {},
    }: {
        method?: string;
        body: any;
        url?: string;
        configs?: RequestInit;
    }) {
        const configuration: RequestInit = await this.interceptor();
        const config = await this.mergeConfigurations(configs, configuration);
        return fetch(this.makeUrl(method, url || undefined), {
            ...config,
            body: JSON.stringify(body),
            method: 'POST',
        }).then((response) => {
            console.log(response)
            const data = response.json();
            return data;
        }).catch((err) => {
            console.log("err - ", err);
            return err;
        });
    }

    async putHttp({
        method = "",
        body = {},
        url = "",
        configs = {},
    }: {
        method?: string;
        body: any;
        url?: string;
        configs?: RequestInit;
    }) {
        const configuration: RequestInit = await this.interceptor();
        const config = await this.mergeConfigurations(configs, configuration);
        return fetch(this.makeUrl(method, url || undefined), {
            ...config,
            body: JSON.stringify(body),
            method: 'PUT',
        }).then((response) => {
            const data = response.json();
            return data;
        }).catch((err) => {
            console.log("err - ", err);
            return err;
        });
    }

    async setClass<T>({
        shouldUpdate = true,
        method = "",
        url = "",
        cachePath,
        customReturn,
    }: {
        shouldUpdate?: boolean;
        method?: string;
        url?: string;
        cachePath?: string;
        customReturn?: string;
    }) {
        const cache = await this.getCache(cachePath ? cachePath : this.cachePath);
        const request = this.isCustomRequest({ url, cachePath });
        if (!cache || !this.hasObject(cache) || shouldUpdate) {
            const response = await this.getHttp<T>({
                method: method || "",
                url: request.url,
            });
            const toReturn = customReturn ? response[customReturn] : response.data;
            await this.setCache(toReturn, shouldUpdate, request.cachePath);
            return toReturn;
        } else {
            return cache;
        }
    }

    // TODO passar para o .env
    private makeUrl(method: string, url?: string) {
        const apiUrl = 'https://806df3oywg.execute-api.us-west-2.amazonaws.com/homolog/api/booking/v1/';
        const baseUrl = apiUrl + (url || this.url);
        const _url = method !== "" ? baseUrl + "/" + method : baseUrl;
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

    private async interceptor() {
        const token = await Auth.currentSession().then((result) => {
            return result.getIdToken().getJwtToken()
        })
        const config: RequestInit = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        }

        return config;
    }

    private async mergeConfigurations(configs: RequestInit, configurations: any) {
        const merged = {
            ...configurations,
            ...configs,
            headers: {
                ...configurations.headers,
                ...configs.headers,
            },
        };
        return merged;
    }
}
