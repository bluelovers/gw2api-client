import AbstractEndpoint from '../endpoint'

import * as Client from '../client';

export class CharactersEndpoint extends AbstractEndpoint
{

	public name: string;

	constructor(client: Client.Client, name: string)
	{
		super(client)
		this.name = name
		this.url = '/v2/characters'
		this.isPaginated = true
		this.isBulk = true
		this.supportsBulkAll = false
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	backstory()
	{
		return new BackstoryEndpoint(this, this.name)
	}

	core()
	{
		return new CoreEndpoint(this, this.name)
	}

	crafting()
	{
		return new CraftingEndpoint(this, this.name)
	}

	equipment()
	{
		return new EquipmentEndpoint(this, this.name)
	}

	heropoints()
	{
		return new HeropointsEndpoint(this, this.name)
	}

	inventory()
	{
		return new InventoryEndpoint(this, this.name)
	}

	recipes()
	{
		return new RecipesEndpoint(this, this.name)
	}

	sab()
	{
		return new SabEndpoint(this, this.name)
	}

	skills()
	{
		return new SkillsEndpoint(this, this.name)
	}

	specializations()
	{
		return new SpecializationsEndpoint(this, this.name)
	}

	training()
	{
		return new TrainingEndpoint(this, this.name)
	}
}

export default CharactersEndpoint;

export class BackstoryEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/backstory`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.backstory)
	}
}

export class CoreEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/core`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}
}

export class CraftingEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/crafting`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.crafting)
	}
}

export class EquipmentEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/equipment`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.equipment)
	}
}

export class HeropointsEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/heropoints`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}
}

export class InventoryEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/inventory`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.bags)
	}
}

export class RecipesEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/recipes`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.recipes)
	}
}

export class SabEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/sab`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}
}

export class SkillsEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/skills`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.skills)
	}
}

export class SpecializationsEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/specializations`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.specializations)
	}
}

export class TrainingEndpoint extends AbstractEndpoint
{
	constructor(client, character)
	{
		super(client)
		this.url = `/v2/characters/${encodeURIComponent(character)}/training`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}

	get()
	{
		return super.get().then(result => result.training)
	}
}
