// initial tests

import Websocket from 'ws'
import EventEmitter from 'node:events'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as J from 'fp-ts/Json'

const LTAT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzOTkwYjQ2MjY0NDE0ZDZlODU4ZjNmY2ViMzAyN2FkMCIsImlhdCI6MTcwMjc1NjI5NCwiZXhwIjoyMDE4MTE2Mjk0fQ.h4tbamEAFiKt7CprRNSsb3d6ncuVjU3EIH0_I6xgkLM'

// const MsgAuthRequired = t.type({
//     type: t.literal('auth_required'),
//     ha_version: t.string,
// })
// type MsgAuthRequiredT = t.TypeOf<typeof MsgAuthRequired>

export const ws = new Websocket('ws://homeassistant.local:8123/api/websocket')
