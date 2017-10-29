import AbstractEndpoint from '../endpoint';
export declare class EventsEndpoint extends AbstractEndpoint {
    constructor(client: any);
    all(): Promise<any[]>;
    get(id: any): Promise<any>;
}
export default EventsEndpoint;
export declare function transformV1Format(json: any): any[];
