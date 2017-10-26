import * as Client from './client';
export declare type vId = string | number;
export interface IAbstractEndpoint extends Client.IClient {
    baseUrl: string;
    isPaginated: boolean;
    maxPageSize: number;
    isBulk: boolean;
    supportsBulkAll: boolean;
    isLocalized: boolean;
    isAuthenticated: boolean;
    isOptionallyAuthenticated: boolean;
    credentials: boolean;
    _skipCache: boolean;
    url?: string;
    cacheTime?: number;
}
export interface IAbstractEndpointModule {
    new (parent: Client.Client | AbstractEndpoint): IAbstractEndpoint;
}
export declare function staticImplements<T>(): (constructor: T) => void;
export declare class AbstractEndpoint implements IAbstractEndpoint {
    lang: Client.vLang;
    apiKey: Client.vApiKey;
    fetch: any;
    caches: any[];
    baseUrl: string;
    isPaginated: boolean;
    maxPageSize: number;
    isBulk: boolean;
    supportsBulkAll: boolean;
    isLocalized: boolean;
    isAuthenticated: boolean;
    isOptionallyAuthenticated: boolean;
    credentials: boolean;
    _skipCache: boolean;
    url?: string;
    cacheTime?: number;
    constructor(parent: Client.Client | AbstractEndpoint);
    language(lang: Client.vLang): this;
    authenticate(apiKey: Client.vApiKey): this;
    live(): this;
    ids(): any;
    _ids(): any;
    get(id?: vId, url?: boolean): any;
    _get(id: any, url: any): any;
    many(ids: vId[]): any;
    _many(ids: any, partialRequest?: boolean): any;
    page(page: number, size?: number): any;
    _page(page: any, size: any): any;
    all(): any;
    _all(): any;
    _cacheSetSingle(key: any, value: any): void;
    _cacheSetMany(values: any): void;
    _cacheGetSingle(key: any, index?: number): any;
    _cacheGetMany(keys: any, index?: number): any;
    _cacheHash(id: any): string;
    _request(url: any, type?: string): any;
    _requestMany(urls: any, type?: string): any;
    _buildUrl(url: any): any;
    _sortByIdList(entries: any, ids: any): any;
    _usesApiKey(): string | boolean;
}
export default AbstractEndpoint;
