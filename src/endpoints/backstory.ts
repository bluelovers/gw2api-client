import AbstractEndpoint from '../endpoint'

export class BackstoryEndpoint extends AbstractEndpoint {
  answers () {
    return new AnswersEndpoint(this)
  }

  questions () {
    return new QuestionsEndpoint(this)
  }
}

export default BackstoryEndpoint

export class AnswersEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/backstory/answers'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}

export class QuestionsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.url = '/v2/backstory/questions'
    this.isPaginated = true
    this.isBulk = true
    this.supportsBulkAll = true
    this.isLocalized = true
    this.cacheTime = 24 * 60 * 60
  }
}
