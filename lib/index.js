const { DateTime, Interval } = require('luxon')

exports.using24hrs = function (leftTime, rightTime, nowDate, zone) {
  let leftH = parse(leftTime)
  let rightH = parse(rightTime)
  let now = DateTime.fromJSDate(nowDate, {zone})
  let leftTemp = now.set(leftH)
  let rightTemp = now.set(rightH)

  if (DateTime.max(leftTemp, rightTemp).equals(rightTemp)) {
    let range = Interval.fromDateTimes(leftTemp, rightTemp)
    return range.contains(now)
  } else { // we need two ranges
    let firstLeft = now.set(leftH)
    let firstRight = now.endOf('day')
    let firstRange = Interval.fromDateTimes(firstLeft, firstRight)
    if (firstRange.contains(now)) return true

    let lastLeft = now.startOf('day')
    let lastRight = now.set(rightH)

    let lastRange = Interval.fromDateTimes(lastLeft, lastRight)
    return lastRange.contains(now)
  }
}

function parse (time) {
  if (typeof time !== 'string') throw Error('please provide time in a 24 hour string')
  let [hour, minute] = time.split(':')
  return {hour, minute}
}
