import AbstractEndpoint from '../endpoint';
export declare class WvwEndpoint extends AbstractEndpoint {
    abilities(): AbilitiesEndpoint;
    matches(): MatchesEndpoint;
    objectives(): ObjectivesEndpoint;
    upgrades(): UpgradesEndpoint;
    ranks(): RanksEndpoint;
}
export default WvwEndpoint;
export declare class AbilitiesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class MatchesEndpoint extends AbstractEndpoint {
    constructor(client: any);
    world(worldId: any): any;
    overview(): MatchesOverviewEndpoint;
    scores(): MatchesScoresEndpoint;
    stats(id: any): MatchesStatsEndpoint;
}
export declare class TeamsEndpoint extends AbstractEndpoint {
    team: any;
    id: any;
    constructor(client: any, id: any, team: any);
    top(which: any): TopStatsEndpoint;
}
export declare class TopStatsEndpoint extends AbstractEndpoint {
    which: any;
    constructor(client: any, id: any, team: any, which: any);
}
export declare class MatchesOverviewEndpoint extends AbstractEndpoint {
    constructor(client: any);
    world(worldId: any): any;
}
export declare class MatchesScoresEndpoint extends AbstractEndpoint {
    constructor(client: any);
    world(worldId: any): any;
}
export declare class MatchesStatsEndpoint extends AbstractEndpoint {
    id: any;
    constructor(client: any, id: any);
    world(worldId: any): any;
    teams(team: any): TeamsEndpoint;
}
export declare class ObjectivesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class UpgradesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class RanksEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
