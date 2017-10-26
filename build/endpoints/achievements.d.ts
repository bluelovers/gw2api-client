import AbstractEndpoint from '../endpoint';
export declare class AchievementsEndpoint extends AbstractEndpoint {
    constructor(client: any);
    categories(): CategoriesEndpoint;
    groups(): GroupsEndpoint;
    daily(): DailyEndpoint;
    dailyTomorrow(): DailyTomorrowEndpoint;
}
export default AchievementsEndpoint;
export declare class CategoriesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class GroupsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class DailyEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class DailyTomorrowEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
