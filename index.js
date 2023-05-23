'use strict'

const fp = require('fastify-plugin')
const EventEmitter = require('events')

async function ebusPlugin (fastify, opts) {
  const instance = opts.instance || 'ebus'

  if (fastify[instance]) {
    throw new Error(`"${instance}" CommandBus instance already registered.`)
  }

  const ee = new EventEmitter()
  fastify.decorate(instance, ee)
  fastify.log.debug(`"${instance} EventEmitter instance registered."`)
}

module.exports = fp(ebusPlugin, {
  fastify: '>=4.0.0',
  name: '@itross/fp-ebus'
})
