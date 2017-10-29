import AbstractEndpoint from '../endpoint';
export interface ITransactionsEndpoint1 {
    current(): ITransactionsEndpoint2;
    history(): ITransactionsEndpoint2;
}
export interface ITransactionsEndpoint2 {
    buys(): TransactionsEndpoint;
    sells(): TransactionsEndpoint;
}
export declare class CommerceEndpoint extends AbstractEndpoint {
    delivery(): DeliveryEndpoint;
    exchange(): ExchangeEndpoint;
    listings(): ListingsEndpoint;
    prices(): PricesEndpoint;
    transactions(): ITransactionsEndpoint1;
}
export default CommerceEndpoint;
export declare class DeliveryEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class ExchangeEndpoint extends AbstractEndpoint {
    constructor(client: any);
    gems(quantity: any): Promise<any>;
    coins(quantity: any): Promise<any>;
}
export declare class ListingsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class PricesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare type vDataISO = string | Date;
export interface ITransactionsEndpointData {
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
export declare class TransactionsEndpoint extends AbstractEndpoint {
    constructor(client: any, type: any, list: any);
    page(...argv: any[]): Promise<ITransactionsEndpointData[]>;
    all(): Promise<ITransactionsEndpointData[]>;
}
