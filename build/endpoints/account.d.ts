import AbstractEndpoint from '../endpoint';
import CharactersEndpoint from './characters';
import PvpEndpoint from './pvp';
import { DeliveryEndpoint, ITransactionsEndpoint1 } from './commerce';
export declare class AccountEndpoint extends AbstractEndpoint {
    constructor(client: any);
    achievements(): AchievementsEndpoint;
    bank(): BankEndpoint;
    characters(name: any): CharactersEndpoint;
    delivery(): DeliveryEndpoint;
    dungeons(): DungeonsEndpoint;
    dyes(): DyesEndpoint;
    finishers(): FinishersEndpoint;
    gliders(): GlidersEndpoint;
    home(): {
        cats: () => HomeCatsEndpoint;
        nodes: () => HomeNodesEndpoint;
    };
    inventory(): InventoryEndpoint;
    mailcarriers(): MailcarriersEndpoint;
    masteries(): MasteriesEndpoint;
    mastery(): {
        points: () => MasteryPointsEndpoint;
    };
    materials(): MaterialsEndpoint;
    minis(): MinisEndpoint;
    outfits(): OutfitsEndpoint;
    pvp(): PvpEndpoint;
    raids(): RaidsEndpoint;
    recipes(): RecipesEndpoint;
    skins(): SkinsEndpoint;
    titles(): TitlesEndpoint;
    transactions(): ITransactionsEndpoint1;
    wallet(): WalletEndpoint;
    blob(): any;
}
export default AccountEndpoint;
export declare class AchievementsEndpoint extends AbstractEndpoint {
    constructor(client: any);
    ids(): Promise<never>;
    get(id: any): any;
    all(): any;
}
export declare class BankEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class DungeonsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class DyesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class FinishersEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class GlidersEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class HomeCatsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class HomeNodesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class InventoryEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class MailcarriersEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class MasteriesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class MasteryPointsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class MaterialsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class MinisEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class OutfitsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class RaidsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class RecipesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class SkinsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class TitlesEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class WalletEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
