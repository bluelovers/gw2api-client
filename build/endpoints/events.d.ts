import AbstractEndpoint from '../endpoint';
export declare class EventsEndpoint extends AbstractEndpoint {
    constructor(client: any);
    all(): any;
    get(id: any): any;
}
export default EventsEndpoint;
export declare function transformV1Format(json: any): any[];
