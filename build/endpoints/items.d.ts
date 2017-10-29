import AbstractEndpoint, { vId } from '../endpoint';
export declare type vGameType = 'Activity' | 'Wvw' | 'Dungeon' | 'Pve' | string;
export declare type vFlags = 'SoulBindOnUse' | string;
export interface ItemsEndpointData {
    name: string;
    description?: string;
    type: string;
    level?: number;
    rarity: string;
    vendor_value?: number;
    default_skin?: number;
    game_types: vGameType[];
    flags: vFlags[];
    restrictions: any[];
    id: number;
    chat_link: string;
    icon: string;
    details: vItemsEndpointDataDetailsAll;
    [key: string]: any;
}
export interface vItemsEndpointDataDetailsAll extends IItemsEndpointDataDetailsWeapon, IItemsEndpointDataDetails {
}
export interface IItemsEndpointDataDetails {
    type: string;
    [key: string]: any;
}
export interface IItemsEndpointDataDetailsWeapon extends IItemsEndpointDataDetails {
    damage_type: string;
    min_power: number;
    max_power: number;
    defense: number;
    infusion_slots: any[];
    infix_upgrade: object;
    secondary_suffix_item_id: string;
}
export declare class ItemsEndpoint extends AbstractEndpoint {
    constructor(client: any);
    get(id: vId): Promise<ItemsEndpointData>;
    many(ids: vId[]): Promise<ItemsEndpointData[]>;
    all(): Promise<ItemsEndpointData[]>;
}
export default ItemsEndpoint;
