/* eslint-env node, mocha */
import { expect } from 'chai'
import index from '../build/index'
import Client from '../build/client'

describe('index', () => {
  it('exports a function that returns a new client object', () => {
    expect(index()).to.be.an.instanceOf(Client)
  })
})
