import AbstractEndpoint from '../endpoint';
export declare class PvpEndpoint extends AbstractEndpoint {
    fromAccount: any;
    constructor(client: any, fromAccount?: any);
    amulets(): AmuletsEndpoint;
    games(): GamesEndpoint;
    heroes(): AccountHeroesEndpoint;
    ranks(): RanksEndpoint;
    seasons(id: any): SeasonsEndpoint;
    standings(): StandingsEndpoint;
    stats(): StatsEndpoint;
}
export default PvpEndpoint;
export declare class AccountHeroesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class AmuletsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class GamesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class HeroesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class RanksEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class SeasonsEndpoint extends AbstractEndpoint {
    id: any;
    constructor(client: any, id: any);
    leaderboards(): SeasonLeaderboardEndpoint;
}
export declare class SeasonLeaderboardEndpoint extends AbstractEndpoint {
    id: any;
    constructor(client: any, id: any);
    ids(): any;
    board(board: any, region: any): SeasonLeaderboardBoardEndpoint;
}
export declare class SeasonLeaderboardBoardEndpoint extends AbstractEndpoint {
    constructor(client: any, id: any, board: any, region: any);
}
export declare class StandingsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class StatsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
