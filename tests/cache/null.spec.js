/* eslint-env node, mocha */
import { expect } from 'chai'
import storage from '../../build/cache/null'
const cache = storage()

describe('cache > null', function () {
  beforeEach(() => {
    cache.flush()
  })

  it('can set and get a single value', async () => {
    await cache.set('foo', 'bar', 1)
    let cached = await cache.get('foo')
    expect(cached).to.equal(null)
  })

  it('can set and get multiple values', async () => {
    await cache.mset(['foo', 'bar', 1], ['herp', 'derp', 1])
    let cached = await cache.mget(['foo', 'herp'])
    expect(cached).to.deep.equal([null, null])
  })
})
