/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../build/endpoints/items'

describe('endpoints > items', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/items', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(false)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/items')

    fetchMock.addResponse([1, 2, 3, 4])
    let content = await endpoint.ids()
    expect(content).to.deep.equal([1, 2, 3, 4])
  })
})
