import fetch from 'lets-fetch'
import flow from 'promise-control-flow'
import * as debugging from 'debug'
import nullCache from './cache/null'
import * as endpoints from './endpoints'

const debug = debugging('gw2api-client')

export type vLang = 'en' | 'es' | 'de' | 'fr' | 'ko' | 'zh';
export type vApiKey = false | string;

export interface IClient
{
	lang: vLang;
	apiKey: vApiKey;
	fetch: fetch;
	caches: any[];
}

export class Client implements IClient
{

	lang: vLang = 'en';
	apiKey: vApiKey = false;
	fetch = fetch;
	caches = [nullCache()];

	constructor()
	{
	}

	// Set the language for locale-aware endpoints
	language(lang: vLang)
	{
		this.lang = lang
		debug(`set the language to ${lang}`)
		return this
	}

	// Set the api key for authenticated endpoints
	authenticate(apiKey: vApiKey)
	{
		this.apiKey = apiKey
		debug(`set the api key to ${apiKey}`)
		return this
	}

	// Set the caching storage method(s)
	cacheStorage(caches)
	{
		this.caches = [].concat(caches)
		debug(`updated the cache storage`)
		return this
	}

	// Make sure we get the new content if the game updates
	flushCacheIfGameUpdated()
	{
		const buildEndpoint = this.build()
		const promises = {
			cacheBuildId: () => buildEndpoint._cacheGetSingle('cacheBuildId'),
			buildId: () => buildEndpoint.live().get()
		}

		return flow.parallel(promises).then(resp =>
		{
			let flushPromises = []

			// Flush the caches if the cached build id is set (as a safety measure)
			// and the cached build id is older than the current one
			if (resp.cacheBuildId && resp.cacheBuildId < resp.buildId)
			{
				debug(`flushing the cache because of a new build`)
				flushPromises = this.caches.map(cache => () => cache.flush())
			}

			// Flush the caches (if needed) and save the current build id
			return flow.parallel(flushPromises)
				.then(() => buildEndpoint._cacheSetSingle('cacheBuildId', resp.buildId))
		})
	}

	// All the different API endpoints
	account(): endpoints.AccountEndpoint
	{
		return new endpoints.AccountEndpoint(this)
	}

	achievements(): endpoints.AchievementsEndpoint
	{
		return new endpoints.AchievementsEndpoint(this)
	}

	backstory(): endpoints.BackstoryEndpoint
	{
		return new endpoints.BackstoryEndpoint(this)
	}

	build(): endpoints.BuildEndpoint
	{
		return new endpoints.BuildEndpoint(this)
	}

	cats(): endpoints.CatsEndpoint
	{
		return new endpoints.CatsEndpoint(this)
	}

	characters(name: string): endpoints.CharactersEndpoint
	{
		return new endpoints.CharactersEndpoint(this, name)
	}

	colors(): endpoints.ColorsEndpoint
	{
		return new endpoints.ColorsEndpoint(this)
	}

	commerce(): endpoints.CommerceEndpoint
	{
		return new endpoints.CommerceEndpoint(this)
	}

	continents(): endpoints.ContinentsEndpoint
	{
		return new endpoints.ContinentsEndpoint(this)
	}

	currencies(): endpoints.CurrenciesEndpoint
	{
		return new endpoints.CurrenciesEndpoint(this)
	}

	dungeons(): endpoints.DungeonsEndpoint
	{
		return new endpoints.DungeonsEndpoint(this)
	}

	emblem(): endpoints.EmblemEndpoint
	{
		return new endpoints.EmblemEndpoint(this)
	}

	events(): endpoints.EventsEndpoint
	{
		return new endpoints.EventsEndpoint(this)
	}

	files(): endpoints.FilesEndpoint
	{
		return new endpoints.FilesEndpoint(this)
	}

	finishers(): endpoints.FinishersEndpoint
	{
		return new endpoints.FinishersEndpoint(this)
	}

	gliders(): endpoints.GlidersEndpoint
	{
		return new endpoints.GlidersEndpoint(this)
	}

	guild(id): endpoints.GuildEndpoint
	{
		return new endpoints.GuildEndpoint(this, id)
	}

	items(): endpoints.ItemsEndpoint
	{
		return new endpoints.ItemsEndpoint(this)
	}

	itemstats(): endpoints.ItemstatsEndpoint
	{
		return new endpoints.ItemstatsEndpoint(this)
	}

	legends(): endpoints.LegendsEndpoint
	{
		return new endpoints.LegendsEndpoint(this)
	}

	mailcarriers(): endpoints.MailcarriersEndpoint
	{
		return new endpoints.MailcarriersEndpoint(this)
	}

	maps(): endpoints.MapsEndpoint
	{
		return new endpoints.MapsEndpoint(this)
	}

	masteries(): endpoints.MasteriesEndpoint
	{
		return new endpoints.MasteriesEndpoint(this)
	}

	materials(): endpoints.MaterialsEndpoint
	{
		return new endpoints.MaterialsEndpoint(this)
	}

	minis(): endpoints.MinisEndpoint
	{
		return new endpoints.MinisEndpoint(this)
	}

	nodes(): endpoints.NodesEndpoint
	{
		return new endpoints.NodesEndpoint(this)
	}

	outfits(): endpoints.OutfitsEndpoint
	{
		return new endpoints.OutfitsEndpoint(this)
	}

	pets(): endpoints.PetsEndpoint
	{
		return new endpoints.PetsEndpoint(this)
	}

	professions(): endpoints.ProfessionsEndpoint
	{
		return new endpoints.ProfessionsEndpoint(this)
	}

	pvp(): endpoints.PvpEndpoint
	{
		return new endpoints.PvpEndpoint(this)
	}

	quaggans(): endpoints.QuaggansEndpoint
	{
		return new endpoints.QuaggansEndpoint(this)
	}

	races(): endpoints.RacesEndpoint
	{
		return new endpoints.RacesEndpoint(this)
	}

	raids(): endpoints.RaidsEndpoint
	{
		return new endpoints.RaidsEndpoint(this)
	}

	recipes(): endpoints.RecipesEndpoint
	{
		return new endpoints.RecipesEndpoint(this)
	}

	skills(): endpoints.SkillsEndpoint
	{
		return new endpoints.SkillsEndpoint(this)
	}

	skins(): endpoints.SkinsEndpoint
	{
		return new endpoints.SkinsEndpoint(this)
	}

	specializations(): endpoints.SpecializationsEndpoint
	{
		return new endpoints.SpecializationsEndpoint(this)
	}

	stories(): endpoints.StoriesEndpoint
	{
		return new endpoints.StoriesEndpoint(this)
	}

	titles(): endpoints.TitlesEndpoint
	{
		return new endpoints.TitlesEndpoint(this)
	}

	tokeninfo(): endpoints.TokeninfoEndpoint
	{
		return new endpoints.TokeninfoEndpoint(this)
	}

	traits(): endpoints.TraitsEndpoint
	{
		return new endpoints.TraitsEndpoint(this)
	}

	worlds(): endpoints.WorldsEndpoint
	{
		return new endpoints.WorldsEndpoint(this)
	}

	wvw(): endpoints.WvwEndpoint
	{
		return new endpoints.WvwEndpoint(this)
	}
}

export default Client;
