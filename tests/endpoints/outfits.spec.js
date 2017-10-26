/* eslint-env node, mocha */
import { expect } from 'chai'
import { mockClient, fetchMock } from '../mocks/client.mock'
import Module from '../../build/endpoints/outfits'

describe('endpoints > outfits', () => {
  let endpoint
  beforeEach(() => {
    endpoint = new Module(mockClient)
    fetchMock.reset()
  })

  it('test /v2/outfits', async () => {
    expect(endpoint.isPaginated).to.equal(true)
    expect(endpoint.isBulk).to.equal(true)
    expect(endpoint.supportsBulkAll).to.equal(true)
    expect(endpoint.isLocalized).to.equal(true)
    expect(endpoint.isAuthenticated).to.equal(false)
    expect(endpoint.cacheTime).to.not.equal(undefined)
    expect(endpoint.url).to.equal('/v2/outfits')

    fetchMock.addResponse({id: 1, name: 'Cook\'s Outfit'})
    let content = await endpoint.get(1)
    expect(content.name).to.equal('Cook\'s Outfit')
  })
})
