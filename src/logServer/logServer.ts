import EventEmitter2 from 'eventemitter2'
import express, { Request, Response } from 'express'
import expressWs from 'express-ws'
import path from 'path'
import liveReload from 'livereload'
import connectLiveReload from 'connect-livereload'

const makeTs = () => {
    const start = Date.now()
    return {
        since: () => (Date.now() - start)/1000
    }
}
const { since } = makeTs()

type LogServerOptions = {
    port: number
    ee: EventEmitter2
}

// const log = (...msg: any[]) => console.log(JSON.stringify(msg, null, 2))
const log = (...msg: any[]) => console.log(JSON.stringify(msg))

const ee = new EventEmitter2()
ee.onAny(log)

const createLiveReload = (url: string) =>
    liveReload.createServer().watch(url) // doesnt lr with ./webroot ???


export const expressServer = ({ port, ee }: LogServerOptions) => {
    createLiveReload('./')

    const { app, getWss } = expressWs(express())

    app.use(connectLiveReload())

    app.use(express.static(path.join(__dirname, '/webroot')))
    
    app.ws('/wss/log', (ws, req, next) => {
    // app.ws('/wss/log', (ws, req) => {
            // just tries to log request, and listen for msgs
        ee.emit('ws.request', req)
        console.log('ws /log hit')
        ws.on('message', msg => ee.emit('cli.message', msg))
        next()
    })
    
    app.listen(port)
    ee.emit('sys.express.ready', { ts: since() })
    return {
        wss: getWss()
    }
}

const port = Number(process.env.PORT) || 3000

const { wss } = expressServer({port, ee})

ee.onAny((evt, msg) => wss.clients.forEach(c => c.send(JSON.stringify([ evt, msg ], null, 2))))

ee.emit('sys.ready', { ts: since() })

setInterval(() => ee.emit('system.heartbeat', { ts: since() }), 6000)