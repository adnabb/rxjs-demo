import { Observable, of, pipe } from 'rxjs'
import { filter, first, map } from 'rxjs/operators'


map<number, number>(x => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`))

// Logs:
// value: 1 
// value: 4
// value: 9

console.log('1111111111111111111111111')

first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`))

// Logs:
// value: 1

console.log('2222222222222222222222222222')

function discardOddDoubleEven() {
  return pipe(
    filter<number>(v => !(v % 2)),
    map(v => v + v),
  )
}

function delay(delayInMillis: number) {
  return (observable) => new Observable(observer => {
    // this function will called each time this
    // Observable is subscribed to.
    const allTimerIDs = new Set<number>()
    const subscription = observable.subscribe({
      next(value) {
        const timerID = setTimeout(() => {
          observer.next(value)
          allTimerIDs.delete(timerID)
        }, delayInMillis)
        allTimerIDs.add(timerID)
      },
      error(err) {
        observer.error(err)
      },
      complete() {
        observer.complete()
      }
    })
    // the return value is the teardown function,
    // which will be invoked when the new
    // Observable is unsubscribed from.
    return () => {
      subscription.unsubscribe()
      allTimerIDs.forEach(timerID => {
        clearTimeout(timerID)
      })
    }
  })
}