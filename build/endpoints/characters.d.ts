import AbstractEndpoint from '../endpoint';
import * as Client from '../client';
export declare class CharactersEndpoint extends AbstractEndpoint {
    name: string;
    constructor(client: Client.Client | AbstractEndpoint, name: string);
    backstory(): BackstoryEndpoint;
    core(): CoreEndpoint;
    crafting(): CraftingEndpoint;
    equipment(): EquipmentEndpoint;
    heropoints(): HeropointsEndpoint;
    inventory(): InventoryEndpoint;
    recipes(): RecipesEndpoint;
    sab(): SabEndpoint;
    skills(): SkillsEndpoint;
    specializations(): SpecializationsEndpoint;
    training(): TrainingEndpoint;
}
export default CharactersEndpoint;
export declare class BackstoryEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class CoreEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
}
export declare class CraftingEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class EquipmentEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class HeropointsEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
}
export declare class InventoryEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class RecipesEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class SabEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
}
export declare class SkillsEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class SpecializationsEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
export declare class TrainingEndpoint extends AbstractEndpoint {
    constructor(client: any, character: any);
    get(): Promise<any>;
}
