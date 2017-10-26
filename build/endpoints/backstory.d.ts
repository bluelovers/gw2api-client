import AbstractEndpoint from '../endpoint';
export declare class BackstoryEndpoint extends AbstractEndpoint {
    answers(): AnswersEndpoint;
    questions(): QuestionsEndpoint;
}
export default BackstoryEndpoint;
export declare class AnswersEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
export declare class QuestionsEndpoint extends AbstractEndpoint {
    constructor(client: any);
}
