#!/usr/bin/env node
const dailyTimeRange = require('../lib')

let fromHours = process.argv[2]
let toHours = process.argv[3]
let timezone = process.argv[4] || 'America/Edmonton'
let result = dailyTimeRange.using24hrs(fromHours, toHours, new Date(), timezone)
console.log(result)
