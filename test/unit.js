const { DateTime } = require('luxon')
const dtr = require('../lib/index')
const test = require('tape')

test('in range. today at 6am is between 5:30 and 10:00', t => {
  let zone = 'America/Edmonton'
  let now = DateTime.fromJSDate(new Date(), {zone}).set({hour: 7})
  let result = dtr.using24hrs('5:30', '10:00', now.toJSDate(), zone)
  t.ok(result)
  t.end()
})

test('out of range. today at 10:01am is not between 5:30 and 10:00', t => {
  let zone = 'America/Edmonton'
  let now = DateTime.fromJSDate(new Date(), {zone}).set({hour: 10, minute: 1})
  let result = dtr.using24hrs('5:30', '10:00', now.toJSDate(), zone)
  t.notOk(result)
  t.end()
})

test('in range, reverse numbers. today at 10:01pm is between 10:00pm and 7:00am', t => {
  let zone = 'America/Edmonton'
  let now = DateTime.fromJSDate(new Date(), {zone}).set({hour: 23, minute: 1})
  let result = dtr.using24hrs('22:00', '7:00', now.toJSDate(), zone)
  t.ok(result)
  t.end()
})

test('in range, reverse numbers. today at 5:00 am is between 10:00pm and 7:00am', t => {
  let zone = 'America/Edmonton'
  let now = DateTime.fromJSDate(new Date(), {zone}).set({hour: 6})
  let result = dtr.using24hrs('22:00', '7:00', now.toJSDate(), zone)
  t.ok(result)
  t.end()
})

test('out of range, reverse numbers. today at 6pm is not between 10:00pm and 7:00am', t => {
  let zone = 'America/Edmonton'
  let now = DateTime.fromJSDate(new Date(), {zone}).set({hour: 19, minute: 0})
  console.log(now.toJSDate().toString())
  let result = dtr.using24hrs('22:00', '7:00', now.toJSDate(), zone)
  t.notOk(result)
  t.end()
})

test('out of range 2, reverse numbers. today at 8am is not between 10:00pm and 7:00am', t => {
  let zone = 'America/Edmonton'
  let now = DateTime.fromJSDate(new Date(), {zone}).set({hour: 9})
  let result = dtr.using24hrs('22:00', '7:00', now.toJSDate(), zone)
  t.notOk(result)
  t.end()
})
