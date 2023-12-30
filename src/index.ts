// initial tests

import Websocket from 'ws'
import EventEmitter from 'node:events'
import EventEmitter2 from 'eventemitter2'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as J from 'fp-ts/Json'

const LTAT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzOTkwYjQ2MjY0NDE0ZDZlODU4ZjNmY2ViMzAyN2FkMCIsImlhdCI6MTcwMjc1NjI5NCwiZXhwIjoyMDE4MTE2Mjk0fQ.h4tbamEAFiKt7CprRNSsb3d6ncuVjU3EIH0_I6xgkLM'

const MsgAuthRequired = t.type({
    type: t.literal('auth_required'),
    ha_version: t.string,
})
type MsgAuthRequiredT = t.TypeOf<typeof MsgAuthRequired>

const ws = new Websocket('ws://homeassistant.local:8123/api/websocket')
const eet = new EventEmitter2()

ws.on('open', () => eet.emit('ws.open'))
ws.on('error', () => eet.emit('ws.error'))
ws.on('message', buffer => {
    const {type, ...rest} = JSON.parse(buffer.toString())
    eet.emit(`msg.${type}`, rest)
})
ws.
eet.onAny(console.log)

eet.on('out', ws.send)

eet.on('msg.auth_required', payload => {
    eet.emit('out', JSON.stringify({
                    type: 'auth',
                    access_token: LTAT,
                }, null, 2))
})
// const eeOut = new EventEmitter()
// eeOut.on('message', (args: object) => {
//     ws.send(JSON.stringify(args))
// })

// const eeIn = new EventEmitter()

// eeIn.on('auth_required', (rest: object) => {
//     eeOut.emit('message', {
//         type: 'auth',
//         access_token: LTAT,
//     })
// })

// ws.on('error', (err) => eeIn.emit('error', err))

// ws.on('open', () => eeIn.emit('open'))

// ws.on('message', buff => {
//     const {type, ...rest} = JSON.parse(buff.toString())
// })



// const actionOn = (ws: Websocket, type: string, decoder: t.TypeC<any>) => {
//     ws.on('message', )
// }


// ws.on('message', buffer => {
//     const str = buffer.toString()
//     console.log(str)
//     const msg = MsgAuthRequired.decode(JSON.parse(str))
//     console.log(msg._tag)
//     if (E.isRight(msg)) {
//         console.log('right', msg.right)
//     } else {
//         console.log('left', JSON.stringify(msg.left))
//     }
//     if (JSON.parse(str)['type'] === 'auth_required') {
//         const pl = JSON.stringify({
//             type: 'auth',
//             access_token: LTAT,
//         }, null, 2)
//         console.log(pl)
    
//         ws.send(pl)
//     }
// })

