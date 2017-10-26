import AbstractEndpoint from '../endpoint'

export class PvpEndpoint extends AbstractEndpoint {

  public fromAccount;

  constructor (client, fromAccount?) {
    super(client)
    this.fromAccount = fromAccount
  }

  amulets () {
    return new AmuletsEndpoint(this)
  }

  games () {
    return new GamesEndpoint(this)
  }

  heroes () {
    if (this.fromAccount) {
      return new AccountHeroesEndpoint(this)
    }

    return new HeroesEndpoint(this)
  }

  ranks () {
    return new RanksEndpoint(this)
  }

  seasons (id) {
    return new SeasonsEndpoint(this, id)
  }

  standings () {
    return new StandingsEndpoint(this)
  }

  stats () {
    return new StatsEndpoint(this)
  }
}

export default PvpEndpoint

export class AccountHeroesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/account/pvp/heroes'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class AmuletsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/amulets'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

export class GamesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/games'
    this.isPaginated = true
    this.isBulk = true
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class HeroesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/heroes'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

export class RanksEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/ranks'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

export class SeasonsEndpoint extends AbstractEndpoint {

	public id;

  constructor (client, id) {
    super(client)
    this.id = id
    this.url = '/v2/pvp/seasons'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }

  leaderboards () {
    return new SeasonLeaderboardEndpoint(this, this.id)
  }
}

export class SeasonLeaderboardEndpoint extends AbstractEndpoint {

  public id;

  constructor (client, id) {
    super(client)
    this.id = id
    this.url = `/v2/pvp/seasons/${id}/leaderboards`
    this.cacheTime = 24 * 60 * 60
  }

  ids () {
    return super.get('', true)
  }

  board (board, region) {
    return new SeasonLeaderboardBoardEndpoint(this, this.id, board, region)
  }
}

export class SeasonLeaderboardBoardEndpoint extends AbstractEndpoint {
  constructor (client, id, board, region) {
    super(client)
    this.url = `/v2/pvp/seasons/${id}/leaderboards/${board}/${region}`
    this.isPaginated = true
    this.cacheTime = 5 * 60
  }
}

export class StandingsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/standings'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class StatsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/pvp/stats'
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}
