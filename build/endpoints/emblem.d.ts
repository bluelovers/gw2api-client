import AbstractEndpoint from '../endpoint';
export declare class EmblemEndpoint extends AbstractEndpoint {
    backgrounds(): LayersEndpoint;
    foregrounds(): LayersEndpoint;
}
export default EmblemEndpoint;
export declare class LayersEndpoint extends AbstractEndpoint {
    constructor(client: any, layer: any);
}
