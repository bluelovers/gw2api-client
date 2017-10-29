import AbstractEndpoint from '../endpoint';
export default class BuildEndpoint extends AbstractEndpoint {
    constructor(client: any);
    get(): Promise<any>;
}
