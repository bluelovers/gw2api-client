import AbstractEndpoint from '../endpoint';
export declare class StoriesEndpoint extends AbstractEndpoint {
    constructor(client: any);
    seasons(): SeasonsEndpoint;
}
export default StoriesEndpoint;
export declare class SeasonsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
