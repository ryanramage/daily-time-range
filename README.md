# daily-time-range

Check to see if a date (usually now) falls within a daily time range.

Also makes sure to look at the timezone as most servers run in UTC, and you probably want the comparison to happen in your own (or customers) timezone.

 - Specify times in 24 hour clock.
 - If you want to wrap around midnight, make sure the left time is the higher number.


## Module Usage

```
npm install daily-time-range
```

``` js
const dtr = require('daily-time-range')
// check now is between 11:30pm and 5am in Edmonton timezone
let okToDoSomething  = dtr.using24hrs('23:30', '5:00', new Date(), 'America/Edmonton')
```

see the unit tests for more examples

## License

MIT
