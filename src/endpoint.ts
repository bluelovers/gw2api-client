import * as parseUrl from 'url-parse'
import * as unique from 'array-unique'
import * as Rusha from 'rusha'
import clone from 'fast-clone'
import * as chunk from 'chunk'
import * as debugging from 'debug'

const sha = (s) => (new Rusha()).digestFromString(s)
const debug = debugging('gw2api-client')
const debugRequest = debugging('gw2api-client:request')

import * as Client from './client';

export type vId = string | number;

export interface IAbstractEndpoint extends Client.IClient
{
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

export interface IAbstractEndpointModule
{
	new(parent: Client.Client | AbstractEndpoint): IAbstractEndpoint;
}

export function staticImplements<T>()
{
	return (constructor: T) => {}
}

@staticImplements<IAbstractEndpointModule>()
export class AbstractEndpoint implements IAbstractEndpoint
{

	lang: Client.vLang;
	apiKey: Client.vApiKey;
	fetch;
	caches: any[];

	baseUrl = 'https://api.guildwars2.com';
	isPaginated = false;
	maxPageSize = 200;
	isBulk = false;
	supportsBulkAll = true;
	isLocalized = false;
	isAuthenticated = false;
	isOptionallyAuthenticated = false;
	credentials = false;

	_skipCache = false;

	url?: string;
	cacheTime?: number;

	constructor(parent: Client.Client | AbstractEndpoint)
	{
		this.lang = parent.lang
		this.apiKey = parent.apiKey
		this.fetch = parent.fetch
		this.caches = parent.caches
	}

	// Set the language for locale-aware endpoints
	language(lang: Client.vLang)
	{
		this.lang = lang
		debug(`set the language to ${lang}`)
		return this
	}

	// Set the api key for authenticated endpoints
	authenticate(apiKey: Client.vApiKey)
	{
		this.apiKey = apiKey
		debug(`set the api key to ${apiKey}`)
		return this
	}

	// Skip caching and get the live data
	live()
	{
		this._skipCache = true
		debug(`skipping cache`)
		return this
	}

	// Get all ids
	ids()
	{
		debug(`ids(${this.url}) called`)

		if (!this.isBulk)
		{
			return Promise.reject(new Error('"ids" is only available for bulk expanding endpoints'))
		}

		// There is no cache time set, so always use the live data
		if (!this.cacheTime)
		{
			return this._ids()
		}

		// Get as much as possible out of the cache
		const hash = this._cacheHash('ids')
		const handleCacheContent = (cached) =>
		{
			if (cached)
			{
				debug(`ids(${this.url}) resolving from cache`)
				return cached
			}

			return this._ids().then(content =>
			{
				this._cacheSetSingle(hash, content)
				return content
			})
		}

		// Get the content either from the cache or API, write it into the cache and return a clone
		const contentPromise = this._skipCache
			? Promise.resolve(false).then(handleCacheContent)
			: this._cacheGetSingle(hash).then(handleCacheContent)

		return contentPromise.then(clone)
	}

	// Get all ids from the live API
	private _ids()
	{
		debug(`ids(${this.url}) requesting from api`)
		return this._request(this.url)
	}

	// Get a single entry by id
	get(id?: vId, url = false)
	{
		debug(`get(${this.url}) called`)

		if (!id && this.isBulk && !url)
		{
			return Promise.reject(new Error('"get" requires an id'))
		}

		// There is no cache time set, so always use the live data
		if (!this.cacheTime)
		{
			return this._get(id, url)
		}

		// Get as much as possible out of the cache
		const hash = this._cacheHash(id)
		const handleCacheContent = (cached) =>
		{
			if (cached)
			{
				debug(`get(${this.url}) resolving from cache`)
				return cached
			}

			return this._get(id, url).then(content =>
			{
				this._cacheSetSingle(hash, content)
				return content
			})
		}

		// Get the content either from the cache or API, write it into the cache and return a clone
		const contentPromise = this._skipCache
			? Promise.resolve(false).then(handleCacheContent)
			: this._cacheGetSingle(hash).then(handleCacheContent)

		return contentPromise.then(clone)
	}

	// Get a single entry by id from the live API
	private _get(id, url)
	{
		debug(`get(${this.url}) requesting from api`)

		// Request the single id if the endpoint a bulk endpoint
		if (this.isBulk && !url)
		{
			return this._request(`${this.url}?id=${id}`)
		}

		// We are dealing with a custom url instead
		if (url)
		{
			return this._request(this.url + id)
		}

		// Just request the base url
		return this._request(this.url)
	}

	// Get multiple entries by ids
	many(ids: vId[])
	{
		debug(`many(${this.url}) called (${ids.length} ids)`)

		if (!this.isBulk)
		{
			return Promise.reject(new Error('"many" is only available for bulk expanding endpoints'))
		}

		// Exit out early if we don't request any ids
		if (ids.length === 0)
		{
			return Promise.resolve([])
		}

		// Always only work on unique ids, since that's how the API works
		ids = unique.immutable(ids)

		// There is no cache time set, so always use the live data
		if (!this.cacheTime)
		{
			return this._many(ids)
		}

		// Get as much as possible out of the cache
		const hashes = ids.map(id => this._cacheHash(id))
		const handleCacheContent = (cached) =>
		{
			cached = cached.filter(x => x)

			if (cached.length === ids.length)
			{
				debug(`many(${this.url}) resolving fully from cache`)
				return cached
			}

			debug(`many(${this.url}) resolving partially from cache (${cached.length} ids)`)
			const missingIds = getMissingIds(ids, cached)
			return this._many(missingIds, cached.length > 0).then(content =>
			{
				const cacheContent = content.map(value => [this._cacheHash(value.id), value])
				this._cacheSetMany(cacheContent)

				// Merge the new content with the cached content and guarantee element order
				content = content.concat(cached)
				return this._sortByIdList(content, ids)
			})
		}

		// Find the ids that are missing in the cached data
		const getMissingIds = (ids, cached) =>
		{
			const cachedIds = {}
			cached.map(x =>
			{
				cachedIds[x.id] = 1
			})

			return ids.filter(x => cachedIds[x] !== 1)
		}

		// Get the content either from the cache or API, write it into the cache and return a clone
		const contentPromise = this._skipCache
			? Promise.resolve([]).then(handleCacheContent)
			: this._cacheGetMany(hashes).then(handleCacheContent)

		return contentPromise.then(clone)
	}

	// Get multiple entries by ids from the live API
	private _many(ids, partialRequest = false)
	{
		debug(`many(${this.url}) requesting from api (${ids.length} ids)`)

		// Chunk the requests to the max page size
		const pages = chunk(ids, this.maxPageSize)
		const requests = pages.map(page => `${this.url}?ids=${page.join(',')}`)

		// If we are partially caching and all not-cached ids are all invalid,
		// simulate the API behaviour by silently swallowing errors.
		let handleMissingIds = (err) =>
		{
			if (partialRequest && err.response && err.response.status === 404)
			{
				return Promise.resolve([])
			}

			/* istanbul ignore next */
			return Promise.reject(err)
		}

		// Work on all requests in parallel and then flatten the responses into one
		return this._requestMany(requests)
			.then(responses => responses.reduce((x, y) => x.concat(y), []))
			.catch(handleMissingIds)
	}

	// Get a single page
	page(page: number, size = this.maxPageSize)
	{
		debug(`page(${this.url}) called`)

		if (!this.isBulk && !this.isPaginated)
		{
			return Promise.reject(new Error('"page" is only available for bulk expanding or paginated endpoints'))
		}

		if (size > this.maxPageSize || size <= 0)
		{
			return Promise.reject(new Error(`"size" has to be between 0 and ${this.maxPageSize}, was ${size}`))
		}

		if (page < 0)
		{
			return Promise.reject(new Error('page has to be 0 or greater'))
		}

		// There is no cache time set, so always use the live data
		if (!this.cacheTime)
		{
			return this._page(page, size)
		}

		// Get as much as possible out of the cache
		const hash = this._cacheHash('page-' + page + '/' + size)
		const handleCacheContent = (cached) =>
		{
			if (cached)
			{
				debug(`page(${this.url}) resolving from cache`)
				return cached
			}

			return this._page(page, size).then(content =>
			{
				let cacheContent = [[hash, content]]

				if (this.isBulk)
				{
					cacheContent = cacheContent.concat(content.map(value => [this._cacheHash(value.id), value]))
				}

				this._cacheSetMany(cacheContent)
				return content
			})
		}

		// Get the content either from the cache or API, write it into the cache and return a clone
		const contentPromise = this._skipCache
			? Promise.resolve(false).then(handleCacheContent)
			: this._cacheGetSingle(hash).then(handleCacheContent)

		return contentPromise.then(clone)
	}

	// Get a single page from the live API
	private _page(page, size)
	{
		debug(`page(${this.url}) requesting from api`)
		return this._request(`${this.url}?page=${page}&page_size=${size}`)
	}

	// Get all entries
	all()
	{
		debug(`all(${this.url}) called`)

		if (!this.isBulk && !this.isPaginated)
		{
			return Promise.reject(new Error('"all" is only available for bulk expanding or paginated endpoints'))
		}

		// There is no cache time set, so always use the live data
		if (!this.cacheTime)
		{
			return this._all()
		}

		// Get as much as possible out of the cache
		const hash = this._cacheHash('all')
		const handleCacheContent = (cached) =>
		{
			if (cached)
			{
				debug(`all(${this.url}) resolving from cache`)
				return cached
			}

			return this._all().then(content =>
			{
				let cacheContent = [[hash, content]]

				if (this.isBulk)
				{
					cacheContent = cacheContent.concat(content.map(value => [this._cacheHash(value.id), value]))
				}

				this._cacheSetMany(cacheContent)
				return content
			})
		}

		// Get the content either from the cache or API, write it into the cache and return a clone
		const contentPromise = this._skipCache
			? Promise.resolve(false).then(handleCacheContent)
			: this._cacheGetSingle(hash).then(handleCacheContent)

		return contentPromise.then(clone)
	}

	// Get all entries from the live API
	private _all()
	{
		debug(`all(${this.url}) requesting from api`)

		// Use bulk expansion if the endpoint supports the "all" keyword
		if (this.isBulk && this.supportsBulkAll)
		{
			return this._request(`${this.url}?ids=all`)
		}

		// Get everything via all pages instead
		let totalEntries
		return this._request(`${this.url}?page=0&page_size=${this.maxPageSize}`, 'response')
			.then(firstPage =>
			{
				// Get the total number of entries off the first page's headers
				totalEntries = firstPage.headers.get('X-Result-Total')
				return firstPage.json()
			})
			.then(result =>
			{
				// Return early if the first page already includes all entries
				if (totalEntries <= this.maxPageSize)
				{
					return result
				}

				// Request all missing pages in parallel
				let requests = []
				for (let page = 1; page < Math.ceil(totalEntries / this.maxPageSize); page++)
				{
					requests.push(`${this.url}?page=${page}&page_size=${this.maxPageSize}`)
				}

				return this._requestMany(requests).then(responses =>
				{
					responses = responses.reduce((x, y) => x.concat(y), [])
					return result.concat(responses)
				})
			})
	}

	// Set a single cache key in all connected cache storages
	private _cacheSetSingle(key, value)
	{
		this.caches.map(cache => cache.set(key, value, this.cacheTime))
	}

	// Set multiples cache key in all connected cache storages
	private _cacheSetMany(values)
	{
		values = values.map(value => [value[0], value[1], this.cacheTime])
		this.caches.map(cache => cache.mset(values))
	}

	// Get a cached value out of the first possible connected cache storages
	private _cacheGetSingle(key, index = 0)
	{
		return this.caches[index].get(key).then(value =>
		{
			if (value || index === this.caches.length - 1)
			{
				return value
			}

			return this._cacheGetSingle(key, ++index)
		})
	}

	// Get multiple cached values out of the first possible connected cache storages
	private _cacheGetMany(keys, index = 0)
	{
		return this.caches[index].mget(keys).then(values =>
		{
			const cleanValues = values.filter(x => x)

			// We got all the requested keys or are through all storages
			if (cleanValues.length === keys.length || index === this.caches.length - 1)
			{
				return values
			}

			// Try to ask the next storage for the keys that we didn't get
			let missingKeys = values
				.map((value, i) => value ? false : keys[i])
				.filter(value => value)

			// Then merge the values of the next storage into the missing slots
			return this._cacheGetMany(missingKeys, ++index).then(missingValues =>
			{
				let i = 0
				return values.map(value => value || missingValues[i++])
			})
		})
	}

	// Get a cache hash for an identifier
	private _cacheHash(id)
	{
		let hash = ''

		if (id)
		{
			hash += ':' + id
		}

		if (this.isLocalized)
		{
			hash += ':' + this.lang
		}

		if (this._usesApiKey())
		{
			hash += ':' + sha(this.apiKey + '')
		}

		return this.baseUrl + this.url + hash
	}

	// Execute a single request
	private _request(url, type = 'json')
	{
		url = this._buildUrl(url)
		debugRequest(`single url ${url}`)

		/* istanbul ignore next */
		const credentials = this.credentials ? 'include' : undefined

		return this.fetch.single(url, { type, credentials })
	}

	// Execute multiple requests in parallel
	private _requestMany(urls, type = 'json')
	{
		urls = urls.map(url => this._buildUrl(url))
		debugRequest(`multiple urls ${urls.join(', ')}`)

		/* istanbul ignore next */
		const credentials = this.credentials ? 'include' : undefined

		return this.fetch.many(urls, { type, credentials })
	}

	// Build the headers for localization and authentication
	private _buildUrl(url)
	{
		// Add the base url
		url = this.baseUrl + url

		// Parse a possibly existing query
		let parsedUrl = parseUrl(url, true)
		let query = parsedUrl.query

		// Only set the API key for authenticated endpoints,
		// when it is required or optional and set on the client
		if (this._usesApiKey())
		{
			query['access_token'] = this.apiKey
		}

		// Set the language for localized endpoints
		if (this.isLocalized)
		{
			query['lang'] = this.lang
		}

		// Build the new url
		parsedUrl.set('query', query)
		let string = parsedUrl.toString()

		// Clean up the mess by the query parser, and unencode ','
		string = string.replace(/%2C/g, ',')
		return string
	}

	// Guarantee the element order of bulk results
	private _sortByIdList(entries, ids)
	{
		// Hash map of the indexes for better time complexity on big arrays
		let indexMap = {}
		ids.map((x, i) =>
		{
			indexMap[x] = i
		})

		// Sort by the indexes
		entries.sort((a, b) => indexMap[a.id] - indexMap[b.id])
		return entries
	}

	private _usesApiKey()
	{
		return this.isAuthenticated && (!this.isOptionallyAuthenticated || this.apiKey)
	}
}

export default AbstractEndpoint;
