import AbstractEndpoint from '../endpoint'

export class GuildEndpoint extends AbstractEndpoint {

  public id: string;

  constructor (client, id) {
    super(client)
    this.id = id
    this.url = '/v2/guild'
    this.isAuthenticated = true
    this.isOptionallyAuthenticated = true
    this.cacheTime = 60 * 60
  }

  get (id) {
    return super.get(`/${id}`, true)
  }

  permissions () {
    return new PermissionsEndpoint(this)
  }

  search (name) {
    return new SearchEndpoint(this, name)
  }

  upgrades () {
    if (this.id === undefined) {
      return new AllUpgradesEndpoint(this)
    }

    return new UpgradesEndpoint(this, this.id)
  }

  log () {
    return new LogEndpoint(this, this.id)
  }

  members () {
    return new MembersEndpoint(this, this.id)
  }

  ranks () {
    return new RanksEndpoint(this, this.id)
  }

  stash () {
    return new StashEndpoint(this, this.id)
  }

  storage () {
    return new StorageEndpoint(this, this.id)
  }

  teams () {
    return new TeamsEndpoint(this, this.id)
  }

  treasury () {
    return new TreasuryEndpoint(this, this.id)
  }
}

export default GuildEndpoint

export class PermissionsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/permissions'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

export class SearchEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/search'
    this.cacheTime = 60 * 60
  }

  name (name) {
    return super.get(`?name=${encodeURIComponent(name)}`, true)
      .then(result => result[0])
  }
}

export class AllUpgradesEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/guild/upgrades'
    this.isPaginated = true
    this.isBulk = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

export class LogEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/log`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }

  since (logId) {
    return super.get(`?since=${logId}`, true)
  }
}

export class MembersEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/members`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class RanksEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/ranks`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class StashEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/stash`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class StorageEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/storage`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class TeamsEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/teams`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class TreasuryEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/treasury`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}

export class UpgradesEndpoint extends AbstractEndpoint {
  constructor (client, id) {
    super(client)
    this.url = `/v2/guild/${encodeURIComponent(id)}/upgrades`
    this.isAuthenticated = true
    this.cacheTime = 5 * 60
  }
}
