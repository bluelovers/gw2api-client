import AbstractEndpoint from '../endpoint';
export declare class ContinentsEndpoint extends AbstractEndpoint {
    constructor(client: any);
    floors(id: any): FloorsEndpoint;
}
export default ContinentsEndpoint;
export declare class FloorsEndpoint extends AbstractEndpoint {
    constructor(client: any, continentId: any);
}
