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
export interface ITransactionsEndpointData {
    id: number;
    item_id: number;
    price: number;
    quantity: number;
    created: string | Date;
    purchased: string | Date;
}
export declare class TransactionsEndpoint extends AbstractEndpoint {
    constructor(client: any, type: any, list: any);
    page(...argv: any[]): Promise<ITransactionsEndpointData[]>;
    all(): Promise<ITransactionsEndpointData[]>;
}
