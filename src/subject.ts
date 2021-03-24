import * as Rx from 'rxjs'
import { AsyncSubject, BehaviorSubject, from, interval, ReplaySubject, Subject } from 'rxjs'
import { multicast, refCount } from 'rxjs/operators'

{

  const subject = new Rx.Subject()

  subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
  })
  subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
  })

  subject.next(1)
  subject.next(2)

}

console.log('11111111111111111111111111')

{

  const subject = new Rx.Subject()

  subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
  })
  subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
  })

  const observable = Rx.from([1, 2, 3])

  observable.subscribe(subject) // 你可以提供一个 Subject 进行订阅

}

console.log('222222222222222222222222222222')

{

  const source = from([1, 2, 3])
  const subject = new Subject()
  const multicasted = source.pipe(multicast(subject))

  // These are, under the hood, `subject.subscribe({...})`:
  multicasted.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  })
  multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  })

  // This is, under the hood, `source.subscribe(subject)`:
  // @ts-ignore
  multicasted.connect()

}

console.log('3333333333333333333333333')

{

  // const source = interval(500)
  // const subject = new Subject()
  // const multicasted = source.pipe(multicast(subject))
  // let subscription1, subscription2, subscriptionConnect

  // subscription1 = multicasted.subscribe({
  //   next: (v) => console.log(`observerA: ${v}`)
  // })
  // // We should call `connect()` here, because the first
  // // subscriber to `multicasted` is interested in consuming values
  // // @ts-ignore
  // subscriptionConnect = multicasted.connect()

  // setTimeout(() => {
  //   subscription2 = multicasted.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`)
  //   })
  // }, 600)

  // setTimeout(() => {
  //   subscription1.unsubscribe()
  // }, 1200)

  // // We should unsubscribe the shared Observable execution here,
  // // because `multicasted` would have no more subscribers after this
  // setTimeout(() => {
  //   subscription2.unsubscribe()
  //   subscriptionConnect.unsubscribe() // for the shared Observable execution
  // }, 2000)

}

console.log('444444444444444444444444444')

{

  // const source = interval(500)
  // const subject = new Subject()
  // const refCounted = source.pipe(multicast(subject), refCount())
  // let subscription1, subscription2

  // // This calls `connect()`, because
  // // it is the first subscriber to `refCounted`
  // console.log('observerA subscribed')
  // subscription1 = refCounted.subscribe({
  //   next: (v) => console.log(`observerA: ${v}`)
  // })

  // setTimeout(() => {
  //   console.log('observerB subscribed')
  //   subscription2 = refCounted.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`)
  //   })
  // }, 600)

  // setTimeout(() => {
  //   console.log('observerA unsubscribed')
  //   subscription1.unsubscribe()
  // }, 1200)

  // // This is when the shared Observable execution will stop, because
  // // `refCounted` would have no more subscribers after this
  // setTimeout(() => {
  //   console.log('observerB unsubscribed')
  //   subscription2.unsubscribe()
  // }, 2000)

  // Logs
  // observerA subscribed
  // observerA: 0
  // observerB subscribed
  // observerA: 1
  // observerB: 1
  // observerA unsubscribed
  // observerB: 2
  // observerB unsubscribed

}

console.log('5555555555555555555')

{

  const subject = new BehaviorSubject(0) // 0 is the initial value

  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  })

  subject.next(1)
  subject.next(2)

  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  })

  subject.next(3)

  // Logs
  // observerA: 0
  // observerA: 1
  // observerA: 2
  // observerB: 2
  // observerA: 3
  // observerB: 3

}

console.log('6666666666666666666666666')

{

  const subject = new ReplaySubject(3) // buffer 3 values for new subscribers

  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  })

  subject.next(1)
  subject.next(2)
  subject.next(3)
  subject.next(4)

  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  })

  subject.next(5)

  // Logs:
  // observerA: 1
  // observerA: 2
  // observerA: 3
  // observerA: 4
  // observerB: 2
  // observerB: 3
  // observerB: 4
  // observerA: 5
  // observerB: 5

}

console.log('77777777777777777777777777')

{

  // const subject = new ReplaySubject(100, 500 /* windowTime */);

  // subject.subscribe({
  //   next: (v) => console.log(`observerA: ${v}`)
  // })

  // let i = 1
  // setInterval(() => subject.next(i++), 200)

  // setTimeout(() => {
  //   subject.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`)
  //   })
  // }, 1000)

  // Logs
  // observerA: 1
  // observerA: 2
  // observerA: 3
  // observerA: 4
  // observerA: 5
  // observerB: 3
  // observerB: 4
  // observerB: 5
  // observerA: 6
  // observerB: 6
  // ...

}

console.log('8888888888888888888888')

{

  const subject = new AsyncSubject()

  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  })

  subject.next(1)
  subject.next(2)
  subject.next(3)
  subject.next(4)

  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  })

  subject.next(5)
  subject.complete()

  // Logs:
  // observerA: 5
  // observerB: 5

}