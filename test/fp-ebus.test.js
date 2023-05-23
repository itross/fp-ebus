'use strict'

const t = require('tap')
const build = require('./build.js')
const eBusPlugin = require('..')

t.test('Should register an ebus instance as "ebus"', async (t) => {
  t.plan(1)
  const app = await build(t)
  await app.register(eBusPlugin)
  t.ok(app.ebus)
})

t.test('Should register an ebus instance as "myEbus"', async (t) => {
  t.plan(1)
  const app = await build(t)
  await app.register(eBusPlugin, { instance: 'myEbus' })
  t.ok(app.myEbus)
})

t.test('Should throw registering the same ebus instance twice', async (t) => {
  t.plan(1)
  const app = await build(t)
  await app.register(eBusPlugin, { instance: 'myEbus' })
  t.rejects(app.register(eBusPlugin, { instance: 'myEbus' }))
})

t.test('Should register two ebus instances', async (t) => {
  t.plan(2)
  const app = await build(t)
  await app
    .register(eBusPlugin, { instance: 'ebus1' })
    .register(eBusPlugin, { instance: 'ebus2' })
  t.ok(app.ebus1)
  t.ok(app.ebus2)
})

t.test('Should register ebus instance and handle event', async (t) => {
  t.plan(2)
  const app = await build(t)
  await app.register(eBusPlugin)
  app.ebus.on('event:test', (data) => {
    t.ok(data)
    t.equal(data.foo, 'bar', 'data.foo should be "bar"')
  })
  app.ebus.emit('event:test', ({ foo: 'bar' }))
})
