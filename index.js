import {SimplePool} from 'nostr-tools'

const pool = new SimplePool()

let relays = ['wss://relay.example.com', 'wss://relay.example2.com']

let sub = pool.sub(
  [...relays, 'wss://relay.example3.com'],
  [
    {
      authors: [
        '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245'
      ]
    }
  ]
)

sub.on('event', event => {
  // this will only be called once the first time the event is received
  // ...
})

let pubs = pool.publish(relays, newEvent)
pubs.on('ok', () => {
  // this may be called multiple times, once for every relay that accepts the event
  // ...
})

let events = await pool.list(relays, [{kinds: [0, 1]}])
let event = await pool.get(relays, {
  ids: ['44e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245']
})

let relaysForEvent = pool.seenOn(
  '44e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245'
)
// relaysForEvent will be an array of URLs from relays a given event was seen on
