import AbstractEndpoint from '../endpoint';
export declare class RecipesEndpoint extends AbstractEndpoint {
    constructor(client: any);
    search(): SearchEndpoint;
}
export default RecipesEndpoint;
export declare class SearchEndpoint extends AbstractEndpoint {
    constructor(client: any);
    input(id: any): Promise<any>;
    output(id: any): Promise<any>;
}
