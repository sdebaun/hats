import Websocket from 'ws'
import EventEmitter2 from 'eventemitter2'

const LTAT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4MWYzMDIyMzVhMDk0YmZmYTUzNzUxYzVkZWZkMmJhOCIsImlhdCI6MTcwMzk1NDUzNywiZXhwIjoyMDE5MzE0NTM3fQ.x6VJs_X57sz_VtA1w6E7vRqHE9Ql2L_pLM91LIjUiQs'
const ws = new Websocket('ws://homeassistant.local:8123/api/websocket')
const ee = new EventEmitter2()

const log = (...msg: any[]) => console.log(JSON.stringify(msg, null, 2))

ws.on('open', () => ee.emit('ws.open'))
ws.on('error', () => ee.emit('ws.error'))
ws.on('close', () => ee.emit('ws.close'))
ws.on('message', buffer => {
    const {type, ...rest} = JSON.parse(buffer.toString())
    ee.emit(`in.${type}`, rest)
})

ee.onAny(log)
ee.on('out', (msg: string) => ws.send(msg))
ee.on('in.auth_required', (rest: object) => {
    ee.emit('out', JSON.stringify({
        type: 'auth',
        access_token: LTAT,
    }, null, 2))
})
ee.on('in.auth_ok', (rest: object) => {
    ee.emit('out', JSON.stringify({
        id: 1234,
        type: 'subscribe_events',
    }))
})

