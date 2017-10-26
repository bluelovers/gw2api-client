import AbstractEndpoint from '../endpoint';
export declare class GuildEndpoint extends AbstractEndpoint {
    id: string;
    constructor(client: any, id: any);
    get(id: any): any;
    permissions(): PermissionsEndpoint;
    search(name: any): any;
    upgrades(): AllUpgradesEndpoint;
    log(): LogEndpoint;
    members(): MembersEndpoint;
    ranks(): RanksEndpoint;
    stash(): StashEndpoint;
    storage(): StorageEndpoint;
    teams(): TeamsEndpoint;
    treasury(): TreasuryEndpoint;
}
export default GuildEndpoint;
export declare class PermissionsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class SearchEndpoint extends AbstractEndpoint {
    constructor(client: any);
    name(name: any): any;
}
export declare class AllUpgradesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class LogEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
    since(logId: any): any;
}
export declare class MembersEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
export declare class RanksEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
export declare class StashEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
export declare class StorageEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
export declare class TeamsEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
export declare class TreasuryEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
export declare class UpgradesEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any);
}
