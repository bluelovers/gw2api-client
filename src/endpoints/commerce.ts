import AbstractEndpoint from '../endpoint'

export interface ITransactionsEndpoint1
{
	current(): ITransactionsEndpoint2;

	history(): ITransactionsEndpoint2;
}

export interface ITransactionsEndpoint2
{
	buys(): TransactionsEndpoint;

	sells(): TransactionsEndpoint;
}

export class CommerceEndpoint extends AbstractEndpoint
{
	// Current things to grab in the delivery box
	delivery()
	{
		return new DeliveryEndpoint(this)
	}

	// Current gem/coin exchange rates
	exchange()
	{
		return new ExchangeEndpoint(this)
	}

	// Current tradingpost listings
	listings()
	{
		return new ListingsEndpoint(this)
	}

	// Current tradingpost prices
	prices()
	{
		return new PricesEndpoint(this)
	}

	// Current and completed transactions
	transactions(): ITransactionsEndpoint1
	{
		return {
			current: () => ({
				buys: () => new TransactionsEndpoint(this, 'current', 'buys'),
				sells: () => new TransactionsEndpoint(this, 'current', 'sells')
			}),
			history: () => ({
				buys: () => new TransactionsEndpoint(this, 'history', 'buys'),
				sells: () => new TransactionsEndpoint(this, 'history', 'sells')
			})
		}
	}
}

export default CommerceEndpoint

export class DeliveryEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = `/v2/commerce/delivery`
		this.isAuthenticated = true
		this.cacheTime = 5 * 60
	}
}

export class ExchangeEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/commerce/exchange'
		this.cacheTime = 10 * 60
	}

	gems(quantity)
	{
		return super.get(`/gems?quantity=${quantity}`, true)
	}

	coins(quantity)
	{
		return super.get(`/coins?quantity=${quantity}`, true)
	}
}

export class ListingsEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/commerce/listings'
		this.isPaginated = true
		this.isBulk = true
		this.supportsBulkAll = false
		this.cacheTime = 2 * 60
	}
}

export class PricesEndpoint extends AbstractEndpoint
{
	constructor(client)
	{
		super(client)
		this.url = '/v2/commerce/prices'
		this.isPaginated = true
		this.isBulk = true
		this.supportsBulkAll = false
		this.cacheTime = 60
	}
}

export type vDataISO = string | Date;

export interface ITransactionsEndpointData
{
	/**
	 * Id of the transaction
	 */
	id: number;
	/**
	 * The item id
	 */
	item_id: number;
	/**
	 * The price in coins
	 */
	price: number;
	/**
	 * The quantity of the item
	 */
	quantity: number;
	/**
	 * The date of creation, using ISO-8601 standard
	 */
	created: vDataISO;
	/**
	 * The date of purchase, using ISO-8601 standard. Not shown in current second-level endpoint
	 */
	purchased?: vDataISO;
}

export class TransactionsEndpoint extends AbstractEndpoint
{
	constructor(client, type, list)
	{
		super(client)
		this.url = `/v2/commerce/transactions/${type}/${list}`
		this.isPaginated = true
		this.isAuthenticated = true
		this.cacheTime = 10 * 60
	}

	public page(...argv): Promise<ITransactionsEndpointData[]>
	{
		if (argv.length > 1)
		{
			return super.page(argv[0], argv[1]);
		}

		return super.page(argv[0]);
	}

	public all(): Promise<ITransactionsEndpointData[]>
	{
		return super.all();
	}
}
