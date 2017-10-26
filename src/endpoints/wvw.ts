import AbstractEndpoint from '../endpoint'

export class WvwEndpoint extends AbstractEndpoint
{
	abilities()
	{
		return new AbilitiesEndpoint(this)
	}

	matches()
	{
		return new MatchesEndpoint(this)
	}

	objectives()
	{
		return new ObjectivesEndpoint(this)
	}

	upgrades()
	{
		return new UpgradesEndpoint(this)
	}

	ranks()
	{
		return new RanksEndpoint(this)
	}
}

export default WvwEndpoint;

export class AbilitiesEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/abilities'
		this.isPaginated = true
		this.isBulk = true
		this.isLocalized = true
		this.cacheTime = 24 * 60 * 60
	}
}

export class MatchesEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/matches'
		this.isPaginated = true
		this.isBulk = true
		this.cacheTime = 30
	}

	world(worldId)
	{
		return super.get(`?world=${worldId}`, true)
	}

	overview()
	{
		return new MatchesOverviewEndpoint(this)
	}

	scores()
	{
		return new MatchesScoresEndpoint(this)
	}

	stats(id)
	{
		return new MatchesStatsEndpoint(this, id)
	}
}

export class TeamsEndpoint extends AbstractEndpoint
{

	public team;
	public id;

	constructor(client, id, team)
	{
		super(client)
		this.team = team
		this.id = id
		this.url = `/v2/wvw/matches/stats/${id}/teams`
	}

	top(which)
	{
		return new TopStatsEndpoint(this, this.id, this.team, which)
	}
}

export class TopStatsEndpoint extends AbstractEndpoint
{

	public which;

	constructor(client, id, team, which)
	{
		super(client)
		this.which = which
		this.url = `/v2/wvw/matches/stats/${id}/teams/${team}/top/${which}`
	}
}

export class MatchesOverviewEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/matches/overview'
		this.isPaginated = true
		this.isBulk = true
		this.cacheTime = 30
	}

	world(worldId)
	{
		return super.get(`?world=${worldId}`, true)
	}
}

export class MatchesScoresEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/matches/scores'
		this.isPaginated = true
		this.isBulk = true
		this.cacheTime = 30
	}

	world(worldId)
	{
		return super.get(`?world=${worldId}`, true)
	}
}

export class MatchesStatsEndpoint extends AbstractEndpoint
{

	public id;

	constructor(client, id)
	{
		super(client)
		this.id = id
		this.url = '/v2/wvw/matches/stats'
		this.isPaginated = true
		this.isBulk = true
		this.cacheTime = 30
	}

	world(worldId)
	{
		return super.get(`?world=${worldId}`, true)
	}

	teams(team)
	{
		return new TeamsEndpoint(this, this.id, team)
	}
}

export class ObjectivesEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/objectives'
		this.isPaginated = true
		this.isBulk = true
		this.isLocalized = true
		this.cacheTime = 24 * 60 * 60
	}
}

export class UpgradesEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/upgrades'
		this.isPaginated = true
		this.isBulk = true
		this.isLocalized = true
		this.cacheTime = 24 * 60 * 60
	}
}

export class RanksEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/wvw/ranks'
		this.isPaginated = true
		this.isBulk = true
		this.isLocalized = true
		this.cacheTime = 24 * 60 * 60
	}
}
